"""
Forecasting services containing ML and LLM forecasting logic
"""
import ast
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
import networkx as nx
from statsmodels.tsa.arima.model import ARIMA
from openai import OpenAI
from django.conf import settings
import io
import base64
from pathlib import Path


class ForecastingService:
    """Service class for handling all forecasting operations"""
    
    def __init__(self):
        self.data_dir = settings.DATA_DIR
        self.openai_client = None
        if settings.OPENAI_API_KEY:
            self.openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)
    
    def load_data(self):
        """Load demand and event data"""
        df = pd.read_csv(self.data_dir / "synthetic_demand_timeseries.csv", parse_dates=["Date"])
        events_df = pd.read_csv(self.data_dir / "Synthetic_Event_Data.csv")
        return df, events_df
    
    def prepare_sku_data(self, df, sku="SKU123", region="North"):
        """Prepare data for specific SKU and region"""
        sku_df = df[(df["SKU"] == sku) & (df["Region"] == region)][["Date", "Demand"]]
        sku_df = sku_df.set_index("Date").asfreq("D")
        return sku_df
    
    def get_recent_data(self, sku_df, days=14):
        """Get recent data as dictionary"""
        recent_data = {str(k.date()): int(v) for k, v in sku_df["Demand"].tail(days).items()}
        return recent_data
    
    def run_ml_forecast(self, sku_df, steps=7):
        """Run ARIMA ML forecast"""
        model = ARIMA(sku_df["Demand"], order=(1, 1, 1))
        model_fit = model.fit()
        
        # Get forecast
        pred = model_fit.forecast(steps=steps)
        
        # Convert to dictionary
        ml_forecast_dict = {str(k.date()): float(v) for k, v in pred.items()}
        
        # Get model summary as string
        summary = str(model_fit.summary())
        
        return ml_forecast_dict, summary
    
    def run_llm_forecast(self, recent_data):
        """Run LLM-based forecast"""
        if not self.openai_client:
            # Return dummy data if no API key
            return self._dummy_llm_forecast(recent_data)
        
        prompt = f"""
        You are a demand planner. Based on the recent 14 days of data below, find the latest day of data and then start forecasting the value for the next 7 days.
        Please forecast the next 7 days of demand for SKU123 in the North region.
        Answer will be in a list of numbers with forecasted value sorted in ascending order with date.
        Answer just the final list with no explanation with following structure: [value1, value2, value3, value4, value5, value6, value7]
        
        Data:
        {recent_data}
        """
        
        try:
            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}]
            )
            
            llm_response = response.choices[0].message.content
            llm_forecast_list = ast.literal_eval(llm_response)
            
            # Get the first forecast date
            last_date = max([pd.to_datetime(d) for d in recent_data.keys()])
            first_forecast_date = last_date + pd.Timedelta(days=1)
            
            # Create date range
            dates = pd.date_range(start=first_forecast_date, periods=len(llm_forecast_list), freq="D")
            llm_forecast_dict = {str(date.date()): val for date, val in zip(dates, llm_forecast_list)}
            
            return llm_forecast_dict
        except Exception as e:
            print(f"LLM forecast error: {e}")
            return self._dummy_llm_forecast(recent_data)
    
    def _dummy_llm_forecast(self, recent_data):
        """Generate dummy forecast if LLM is not available"""
        last_date = max([pd.to_datetime(d) for d in recent_data.keys()])
        first_forecast_date = last_date + pd.Timedelta(days=1)
        dates = pd.date_range(start=first_forecast_date, periods=7, freq="D")
        
        # Simple forecast based on recent average
        recent_values = list(recent_data.values())
        avg = sum(recent_values) / len(recent_values)
        forecast_values = [int(avg + np.random.randint(-10, 10)) for _ in range(7)]
        
        return {str(date.date()): val for date, val in zip(dates, forecast_values)}
    
    def get_events_for_date(self, date_str, events_df, sku="SKU123", region="North"):
        """Get events for a specific date"""
        date = pd.to_datetime(date_str)
        subset = events_df[
            (pd.to_datetime(events_df["Start_Date"]) <= date) &
            (pd.to_datetime(events_df["End_Date"]) >= date) &
            ((events_df["SKU"] == sku) | (events_df["SKU"] == "ALL")) &
            ((events_df["Region"] == region) | (events_df["Region"] == "National"))
        ]
        return subset.to_dict("records")
    
    def explain_forecast(self, forecast_dict, events_df, sku="SKU123", region="North"):
        """Generate LLM explanations for forecast"""
        if not self.openai_client:
            return self._dummy_explanations(forecast_dict, events_df, sku, region)
        
        explanations = {}
        for date, value in forecast_dict.items():
            related_events = self.get_events_for_date(date, events_df, sku, region)
            
            event_text = "None"
            if related_events:
                event_text = "; ".join([f"{e['Event_Type']} ({e['Description']})" for e in related_events])
            
            prompt = f"""
            The demand forecast for {sku} in {region} on {date} is {round(value, 2)} units.
            Relevant events: {event_text}.
            
            Explain in plain language why the demand looks like this.
            """
            
            try:
                response = self.openai_client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[{"role": "user", "content": prompt}]
                )
                explanations[date] = response.choices[0].message.content
            except Exception as e:
                explanations[date] = f"Unable to generate explanation. Events: {event_text}"
        
        return explanations
    
    def _dummy_explanations(self, forecast_dict, events_df, sku, region):
        """Generate dummy explanations if LLM is not available"""
        explanations = {}
        for date, value in forecast_dict.items():
            related_events = self.get_events_for_date(date, events_df, sku, region)
            
            if related_events:
                event_text = "; ".join([f"{e['Event_Type']} ({e['Description']})" for e in related_events])
                explanations[date] = f"Forecast: {round(value, 2)} units. Events affecting demand: {event_text}"
            else:
                explanations[date] = f"Forecast: {round(value, 2)} units. Normal demand expected with no special events."
        
        return explanations
    
    def create_visualization(self, sku_df, ml_forecast_dict, llm_forecast_dict):
        """Create forecast visualization"""
        plt.figure(figsize=(14, 6))
        
        # Plot historical data
        plt.plot(sku_df.index, sku_df["Demand"], label="Historical Demand", color="blue", linewidth=2)
        
        # Plot ML forecast
        ml_dates = [pd.to_datetime(d) for d in ml_forecast_dict.keys()]
        ml_values = list(ml_forecast_dict.values())
        plt.plot(ml_dates, ml_values, label="ML Forecast (ARIMA)", color="red", marker='o', linewidth=2)
        
        # Plot LLM forecast
        llm_dates = [pd.to_datetime(d) for d in llm_forecast_dict.keys()]
        llm_values = list(llm_forecast_dict.values())
        plt.plot(llm_dates, llm_values, label="LLM Forecast", color="green", marker='s', linewidth=2)
        
        plt.xlabel("Date", fontsize=12)
        plt.ylabel("Demand", fontsize=12)
        plt.title("Demand Forecast - SKU123 North Region", fontsize=14, fontweight='bold')
        plt.legend(fontsize=10)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        # Convert plot to base64 string
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png', dpi=100, bbox_inches='tight')
        buffer.seek(0)
        image_base64 = base64.b64encode(buffer.read()).decode()
        plt.close()
        
        return image_base64
    
    def create_graph_rag(self):
        """Create supply chain knowledge graph"""
        G = nx.DiGraph()
        
        # Add nodes
        G.add_node("SupplierA", type="Supplier")
        G.add_node("Plant1", type="Plant")
        G.add_node("SKU123", type="SKU")
        G.add_node("WarehouseN", type="Warehouse")
        G.add_node("CustomerX", type="Customer")
        G.add_node("North", type="Region")
        
        # Add edges
        G.add_edge("SupplierA", "Plant1", relation="SUPPLIES")
        G.add_edge("Plant1", "SKU123", relation="PRODUCES")
        G.add_edge("SKU123", "WarehouseN", relation="STORES")
        G.add_edge("WarehouseN", "CustomerX", relation="SHIPS_TO")
        G.add_edge("CustomerX", "North", relation="LOCATED_IN")
        
        # Add event nodes
        events = [
            {"id": "E1", "type": "Promotion", "desc": "Valentine's Day promo", "target": "SKU123"},
            {"id": "E2", "type": "Promotion", "desc": "Spring Sale", "target": "SKU123"},
            {"id": "E3", "type": "Holiday", "desc": "Good Friday", "target": "North"},
        ]
        
        for e in events:
            G.add_node(e["desc"], type="Event", event_type=e["type"], description=e["desc"])
            G.add_edge(e["desc"], e["target"], relation="AFFECTS")
        
        return G
    
    def visualize_graph(self, G):
        """Visualize the knowledge graph"""
        color_map = []
        for node, data in G.nodes(data=True):
            if data["type"] == "Supplier":
                color_map.append("red")
            elif data["type"] == "Plant":
                color_map.append("orange")
            elif data["type"] == "SKU":
                color_map.append("green")
            elif data["type"] == "Warehouse":
                color_map.append("blue")
            elif data["type"] == "Customer":
                color_map.append("purple")
            elif data["type"] == "Event":
                color_map.append("pink")
            else:
                color_map.append("gray")
        
        plt.figure(figsize=(12, 8))
        pos = nx.spring_layout(G, seed=42, k=2, iterations=50)
        nx.draw(G, pos, with_labels=True, node_color=color_map, 
                node_size=2000, font_size=9, font_color="white", 
                font_weight="bold", arrows=True, edge_color="gray",
                arrowsize=20, arrowstyle='->')
        
        edge_labels = nx.get_edge_attributes(G, "relation")
        nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_size=8)
        
        plt.title("Supply Chain Knowledge Graph", fontsize=16, fontweight='bold')
        plt.axis('off')
        plt.tight_layout()
        
        # Convert to base64
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png', dpi=100, bbox_inches='tight')
        buffer.seek(0)
        image_base64 = base64.b64encode(buffer.read()).decode()
        plt.close()
        
        return image_base64
    
    def get_graph_rag_explanation(self, G, query="What events and entities are most impacted by SKU123 in early April?"):
        """Get explanation from graph RAG"""
        if not self.openai_client:
            return self._dummy_graph_explanation(G)
        
        # Get subgraph
        subG = self.get_n_hop_subgraph(G, "SKU123", n=2)
        context_text = self.subgraph_to_text(subG)
        
        prompt = f"""
        Knowledge Graph context (2-hop neighborhood of SKU123):
        
        {context_text}
        
        User Question: {query}
        
        Answer using the graph context above.
        """
        
        try:
            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}]
            )
            return response.choices[0].message.content
        except Exception as e:
            return self._dummy_graph_explanation(G)
    
    def _dummy_graph_explanation(self, G):
        """Dummy graph explanation if LLM not available"""
        return ("Based on the supply chain graph, SKU123 is connected to multiple entities including "
                "suppliers, plants, warehouses, and customers. Events like promotions and holidays "
                "directly affect SKU123 demand in early April, particularly the Spring Sale promotion "
                "and Good Friday holiday.")
    
    def get_n_hop_subgraph(self, G, start_node, n=2):
        """Get n-hop subgraph from start node"""
        nodes = {start_node}
        frontier = {start_node}
        for _ in range(n):
            next_frontier = set()
            for node in frontier:
                neighbors = set(G.successors(node)) | set(G.predecessors(node))
                next_frontier |= neighbors
            nodes |= next_frontier
            frontier = next_frontier
        return G.subgraph(nodes)
    
    def subgraph_to_text(self, G_sub):
        """Convert subgraph to text representation"""
        context = []
        for u, v, data in G_sub.edges(data=True):
            relation = data.get("relation", "RELATED_TO")
            context.append(f"{u} --[{relation}]--> {v}")
        for node, data in G_sub.nodes(data=True):
            if data.get("type") == "Event":
                context.append(f"Event {node}: {data.get('event_type')} ({data.get('description')})")
        return "\n".join(context)

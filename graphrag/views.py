"""
Views for graphrag forecasting application
"""
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .services import ForecastingService
import traceback


def index(request):
    """Main dashboard view"""
    return render(request, 'graphrag/index.html')


@require_http_methods(["POST"])
@csrf_exempt
def run_forecast(request):
    """Run all forecasting operations and return results"""
    try:
        service = ForecastingService()
        
        # Load data
        df, events_df = service.load_data()
        sku_df = service.prepare_sku_data(df)
        recent_data = service.get_recent_data(sku_df)
        
        # Run ML forecast
        ml_forecast_dict, ml_summary = service.run_ml_forecast(sku_df)
        
        # Run LLM forecast
        llm_forecast_dict = service.run_llm_forecast(recent_data)
        
        # Get explanations
        explanations = service.explain_forecast(llm_forecast_dict, events_df)
        
        # Create visualization
        viz_image = service.create_visualization(sku_df, ml_forecast_dict, llm_forecast_dict)
        
        # Create graph
        G = service.create_graph_rag()
        graph_image = service.visualize_graph(G)
        graph_explanation = service.get_graph_rag_explanation(G)
        
        context = {
            'success': True,
            'recent_data': recent_data,
            'ml_forecast': ml_forecast_dict,
            'ml_summary': ml_summary,
            'llm_forecast': llm_forecast_dict,
            'explanations': explanations,
            'visualization': viz_image,
            'graph_visualization': graph_image,
            'graph_explanation': graph_explanation,
        }
        
        return JsonResponse(context)
    
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e),
            'traceback': traceback.format_exc()
        }, status=500)


def dashboard(request):
    """Dashboard view - loads page without running forecast"""
    context = {
        'forecast_ready': False,
    }
    return render(request, 'graphrag/dashboard.html', context)

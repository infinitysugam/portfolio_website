# GraphRAG Supply Chain Forecasting Integration

## Overview
Successfully integrated the supply chain forecasting Django project into the personal_website's `graphrag` app without affecting existing CSS and code.

## What Was Done

### 1. **Service Layer** (`graphrag/services.py`)
- Copied the complete `ForecastingService` class from the supply chain project
- Handles ML forecasting (ARIMA), LLM forecasting (GPT), and Graph RAG operations
- Generates visualizations and explanations

### 2. **Views** (`graphrag/views.py`)
- `index()` - Landing page for the forecasting system
- `dashboard()` - Main dashboard view
- `run_forecast()` - API endpoint that executes all forecasting operations

### 3. **URL Configuration**
- Created `graphrag/urls.py` with app namespace `graphrag`
- Updated main `personal_website/urls.py` to include graphrag URLs at `/graphrag/`
- Routes:
  - `/graphrag/` - Home page
  - `/graphrag/dashboard/` - Dashboard
  - `/graphrag/api/run-forecast/` - Forecast API endpoint

### 4. **Templates** (Isolated CSS)
Created templates in `/templates/graphrag/`:
- `base.html` - Base template with **namespaced CSS classes** (prefixed with `graphrag-`)
- `index.html` - Landing page with features and instructions
- `dashboard.html` - Interactive dashboard with forecast controls

**CSS Isolation Strategy:**
- All custom CSS classes prefixed with `graphrag-` (e.g., `graphrag-gradient-bg`, `graphrag-card-hover`)
- Uses TailwindCSS CDN (self-contained)
- No conflicts with existing personal website styles

### 5. **Settings Configuration** (`personal_website/settings.py`)
- Added `'graphrag'` to `INSTALLED_APPS`
- Configured `DATA_DIR = BASE_DIR / 'graphrag' / 'data'`
- Added `OPENAI_API_KEY` configuration (reads from environment variable)

### 6. **Data Files**
Copied required CSV files to `graphrag/data/`:
- `synthetic_demand_timeseries.csv` - Historical demand data
- `Synthetic_Event_Data.csv` - Event data (promotions, holidays)

## How to Use

### Access the Application
1. Start the Django server: `python manage.py runserver`
2. Navigate to: `http://localhost:8000/graphrag/`
3. Click "Go to Dashboard" or visit `http://localhost:8000/graphrag/dashboard/`
4. Click "Run Forecast" to execute the analysis

### Features Available
- **ML Forecasting**: ARIMA-based 7-day demand forecast
- **LLM Forecasting**: GPT-powered forecast with natural language explanations
- **Graph RAG**: Supply chain knowledge graph with contextual insights
- **Visualizations**: Interactive charts showing historical and forecasted demand
- **Event Analysis**: Tracks how promotions and holidays impact demand

### API Key Configuration
To enable LLM features, set the OpenAI API key:
```bash
export OPENAI_API_KEY='your-api-key-here'
```

Or the system will use dummy data if no API key is provided.

## No Impact on Existing Code

### CSS Isolation
- All graphrag styles are namespaced and scoped to graphrag templates only
- Uses separate base template (`graphrag/base.html`) instead of main site's `base.html`
- TailwindCSS loaded via CDN is scoped to graphrag pages

### URL Isolation
- All graphrag routes are under `/graphrag/` prefix
- Main site routes (`/`, `/resume/`, `/contact/`) remain unchanged
- Navigation link to main site included in graphrag navbar

### App Isolation
- graphrag app is self-contained in its own directory
- No modifications to existing apps or views
- Data files stored in `graphrag/data/` directory

## Dependencies
All required packages are already in `requirements.txt`:
- Django==4.2.7
- pandas==2.1.3
- numpy==1.26.2
- matplotlib (already present)
- statsmodels==0.14.0
- scikit-learn==1.3.2
- openai (already present)
- networkx==3.2.1

## File Structure
```
personal_website/
├── graphrag/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── services.py          # NEW - Forecasting logic
│   ├── urls.py              # NEW - URL routing
│   ├── views.py             # UPDATED - View functions
│   ├── data/                # NEW - Data directory
│   │   ├── synthetic_demand_timeseries.csv
│   │   └── Synthetic_Event_Data.csv
│   └── migrations/
├── templates/
│   ├── graphrag/            # NEW - Isolated templates
│   │   ├── base.html
│   │   ├── index.html
│   │   └── dashboard.html
│   └── base.html            # Unchanged
├── personal_website/
│   ├── settings.py          # UPDATED - Added graphrag app
│   ├── urls.py              # UPDATED - Added graphrag route
│   └── views.py             # Unchanged
└── GRAPHRAG_INTEGRATION.md  # This file
```

## Testing
To verify the integration:
1. Run migrations: `python manage.py migrate`
2. Start server: `python manage.py runserver`
3. Visit: `http://localhost:8000/graphrag/`
4. Test the dashboard and forecast functionality

## Notes
- The integration is completely isolated and won't affect your existing personal website
- You can access the main site at `http://localhost:8000/` as before
- The graphrag app is accessible at `http://localhost:8000/graphrag/`
- All CSS is namespaced to prevent conflicts
- Data files are self-contained in the graphrag app directory

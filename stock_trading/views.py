from django.shortcuts import render

def index(request):
    """About page explaining the RL-driven stock trading platform"""
    return render(request, 'stock_trading/index.html')

def dashboard(request):
    """Dashboard showing trading performance and metrics"""
    # Sample data for demonstration
    context = {
        'total_trades': 1247,
        'win_rate': 67.3,
        'total_return': 34.2,
        'sharpe_ratio': 1.85,
        'max_drawdown': -12.4,
        'avg_trade_duration': '2.3 days',
    }
    return render(request, 'stock_trading/dashboard.html', context)

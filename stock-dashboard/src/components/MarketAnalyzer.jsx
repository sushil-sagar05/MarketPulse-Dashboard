import  { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MarketAnalyzer = ({ stockData, company, loading }) => {
  const [chartType, setChartType] = useState('price');

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 h-full max-h-full overflow-hidden">
        <div className="animate-pulse space-y-4 h-full">
          <div className="flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="flex-1 bg-gray-200 rounded-lg min-h-[300px]"></div>
        </div>
      </div>
    );
  }

  if (!stockData || stockData.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Analysis Ready</h3>
          <p className="text-gray-500 max-w-sm">Select a stock from the sidebar to view detailed charts and technical analysis</p>
        </div>
      </div>
    );
  }

  const labels = stockData.map(item => {
    const date = new Date(item.date);
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  });

  const prices = stockData.map(item => parseFloat(item.close) || 0);
  const volumes = stockData.map(item => parseInt(item.volume) || 0);
  const highs = stockData.map(item => parseFloat(item.high) || 0);
  const lows = stockData.map(item => parseFloat(item.low) || 0);

  const currentPrice = prices[prices.length - 1] || 0;
  const previousPrice = prices[prices.length - 2] || currentPrice;
  const highPrice = Math.max(...highs.filter(h => h > 0)) || currentPrice;
  const lowPrice = Math.min(...lows.filter(l => l > 0)) || currentPrice;
  const avgVolume = volumes.length > 0 ? volumes.reduce((a, b) => a + b, 0) / volumes.length : 0;
  const priceChange = currentPrice - previousPrice;
  const percentChange = previousPrice > 0 ? ((priceChange / previousPrice) * 100).toFixed(2) : '0.00';

  const priceData = {
    labels,
    datasets: [
      {
        label: 'Price (₹)',
        data: prices,
        borderColor: priceChange >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
        backgroundColor: priceChange >= 0 
          ? 'rgba(34, 197, 94, 0.1)' 
          : 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  const volumeData = {
    labels,
    datasets: [
      {
        label: 'Trading Volume',
        data: volumes,
        backgroundColor: volumes.map(vol => 
          vol > avgVolume 
            ? 'rgba(59, 130, 246, 0.8)' 
            : 'rgba(156, 163, 175, 0.6)'
        ),
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            if (chartType === 'price') {
              return `Price: ₹${context.parsed.y.toLocaleString()}`;
            } else {
              return `Volume: ${(context.parsed.y / 1000000).toFixed(1)}M`;
            }
          }
        }
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { 
          color: '#6B7280', 
          font: { size: 11 },
          maxTicksLimit: 8,
        }
      },
      y: {
        beginAtZero: chartType === 'volume',
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: {
          color: '#6B7280',
          font: { size: 11 },
          callback: function(value) {
            if (chartType === 'price') {
              return '₹' + value.toLocaleString();
            } else {
              return (value / 1000000).toFixed(1) + 'M';
            }
          }
        }
      },
    },
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-gray-900 mb-1 truncate">
              {company?.symbol || 'Stock Analysis'}
            </h2>
            <p className="text-sm text-gray-600 truncate">
              {company?.name || 'Select a stock'} {company?.sector && `• ${company.sector}`}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => setChartType('price')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                chartType === 'price' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Price Chart
            </button>
            <button
              onClick={() => setChartType('volume')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                chartType === 'volume' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Volume
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-blue-600 font-medium">Current Price</p>
                <p className="text-sm font-bold text-blue-900 truncate">
                  ₹{currentPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
              </div>
              <Activity className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2" />
            </div>
          </div>
          
          <div className={`rounded-lg p-3 border ${
            priceChange >= 0 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
              : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs font-medium ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  24h Change
                </p>
                <p className={`text-sm font-bold truncate ${priceChange >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                  {priceChange >= 0 ? '+' : ''}₹{Math.abs(priceChange).toFixed(2)}
                </p>
                <p className={`text-xs ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ({percentChange}%)
                </p>
              </div>
              {priceChange >= 0 
                ? <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 ml-2" />
                : <TrendingDown className="w-5 h-5 text-red-600 flex-shrink-0 ml-2" />
              }
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-3 border border-emerald-200">
            <div>
              <p className="text-xs text-emerald-600 font-medium">Period High</p>
              <p className="text-sm font-bold text-emerald-900 truncate">
                ₹{highPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-rose-50 to-red-50 rounded-lg p-3 border border-rose-200">
            <div>
              <p className="text-xs text-rose-600 font-medium">Period Low</p>
              <p className="text-sm font-bold text-rose-900 truncate">
                ₹{lowPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 min-h-0">
        <div className="h-full w-full relative">
          {chartType === 'price' ? (
            <Line data={priceData} options={chartOptions} />
          ) : (
            <Bar data={volumeData} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketAnalyzer;

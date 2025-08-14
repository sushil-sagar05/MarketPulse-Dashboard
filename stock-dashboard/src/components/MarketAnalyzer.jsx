import { useState } from 'react';
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
import { TrendingUp, TrendingDown, BarChart3, Activity} from 'lucide-react';

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
      <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-200 p-3 sm:p-6 lg:p-8 xl:p-10 h-full">
        <div className="animate-pulse space-y-4 lg:space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0">
            <div className="h-6 sm:h-8 lg:h-10 bg-gray-200 rounded w-2/3 sm:w-1/3"></div>
            <div className="h-6 sm:h-8 lg:h-10 bg-gray-200 rounded w-24 lg:w-32"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 sm:h-20 lg:h-28 xl:h-32 bg-gray-200 rounded-lg lg:rounded-xl"></div>
            ))}
          </div>
          <div className="h-64 sm:h-96 lg:h-[500px] xl:h-[600px] bg-gray-200 rounded-lg lg:rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!stockData || stockData.length === 0) {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-200 p-6 lg:p-12 h-full flex items-center justify-center">
        <div className="text-center py-8 sm:py-12 lg:py-20">
          <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 text-gray-300 mx-auto mb-4 lg:mb-6" />
          <h3 className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-semibold text-gray-900 mb-2 lg:mb-4">Market Analysis Ready</h3>
          <p className="text-sm lg:text-base xl:text-lg text-gray-500 max-w-sm lg:max-w-lg px-4">Select a stock from the sidebar to view detailed charts and comprehensive technical analysis</p>
        </div>
      </div>
    );
  }

  const labels = stockData.map(item => {
    const date = new Date(item.date);
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  });

  const prices = stockData.map(item => item.close);
  const volumes = stockData.map(item => item.volume);
  const highs = stockData.map(item => item.high);
  const lows = stockData.map(item => item.low);

  const currentPrice = stockData[stockData.length - 1]?.close;
  const previousPrice = stockData[stockData.length - 2]?.close;
  const highPrice = Math.max(...highs);
  const lowPrice = Math.min(...lows);
  const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;
  const priceChange = currentPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100).toFixed(2);

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
        borderWidth: window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: window.innerWidth < 640 ? 4 : window.innerWidth < 1024 ? 6 : 8,
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
        borderRadius: window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 4 : 6,
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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: window.innerWidth < 1024 ? 8 : 12,
        displayColors: false,
        titleFont: { size: window.innerWidth < 640 ? 12 : window.innerWidth < 1024 ? 14 : 16 },
        bodyFont: { size: window.innerWidth < 640 ? 11 : window.innerWidth < 1024 ? 12 : 14 },
        padding: window.innerWidth < 1024 ? 8 : 12,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { 
          color: '#6B7280', 
          font: { size: window.innerWidth < 640 ? 10 : window.innerWidth < 1024 ? 11 : 13 },
          maxTicksLimit: window.innerWidth < 640 ? 6 : window.innerWidth < 1024 ? 10 : 15,
        }
      },
      y: {
        beginAtZero: false,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: {
          color: '#6B7280',
          font: { size: window.innerWidth < 640 ? 10 : window.innerWidth < 1024 ? 11 : 13 },
          maxTicksLimit: window.innerWidth < 640 ? 5 : window.innerWidth < 1024 ? 8 : 10,
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      },
    },
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-200 h-full flex flex-col overflow-hidden shadow-sm lg:shadow-lg">
      <div className="p-3 sm:p-6 lg:p-8 xl:p-10 border-b border-gray-100 flex-shrink-0">
        <div className="flex flex-col space-y-3 sm:space-y-4 lg:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 lg:gap-6">
            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-1 lg:mb-2 truncate">
                {company?.symbol}
              </h2>
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600 truncate">
                {company?.name} • {company?.sector}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
              <button
                onClick={() => setChartType('price')}
                className={`px-2 sm:px-3 lg:px-4 xl:px-6 py-1.5 lg:py-2 xl:py-3 text-xs lg:text-sm xl:text-base font-medium rounded-lg lg:rounded-xl transition-colors ${
                  chartType === 'price' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Price Chart
              </button>
              <button
                onClick={() => setChartType('volume')}
                className={`px-2 sm:px-3 lg:px-4 xl:px-6 py-1.5 lg:py-2 xl:py-3 text-xs lg:text-sm xl:text-base font-medium rounded-lg lg:rounded-xl transition-colors ${
                  chartType === 'volume' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Volume
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 xl:gap-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg lg:rounded-xl p-2 sm:p-4 lg:p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs lg:text-sm xl:text-base text-blue-600 font-medium truncate">Current Price</p>
                  <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-blue-900 truncate">
                    ₹{currentPrice?.toLocaleString()}
                  </p>
                </div>
                <Activity className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600 flex-shrink-0" />
              </div>
            </div>
            
            <div className={`rounded-lg lg:rounded-xl p-2 sm:p-4 lg:p-6 border ${
              priceChange >= 0 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className={`text-xs lg:text-sm xl:text-base font-medium truncate ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    24h Change
                  </p>
                  <p className={`text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold truncate ${priceChange >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                    {priceChange >= 0 ? '+' : ''}₹{Math.abs(priceChange).toFixed(2)}
                  </p>
                  <p className={`text-xs lg:text-sm ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ({percentChange}%)
                  </p>
                </div>
                {priceChange >= 0 
                  ? <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-600 flex-shrink-0" />
                  : <TrendingDown className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-red-600 flex-shrink-0" />
                }
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg lg:rounded-xl p-2 sm:p-4 lg:p-6 border border-emerald-200">
              <div>
                <p className="text-xs lg:text-sm xl:text-base text-emerald-600 font-medium truncate">Period High</p>
                <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-emerald-900 truncate">
                  ₹{highPrice?.toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-rose-50 to-red-50 rounded-lg lg:rounded-xl p-2 sm:p-4 lg:p-6 border border-rose-200">
              <div>
                <p className="text-xs lg:text-sm xl:text-base text-rose-600 font-medium truncate">Period Low</p>
                <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-rose-900 truncate">
                  ₹{lowPrice?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-3 sm:p-6 lg:p-8 xl:p-10 min-h-0">
        <div className="h-full w-full">
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

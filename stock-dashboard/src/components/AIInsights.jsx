import { Brain, TrendingUp, TrendingDown, Target, Zap, Activity } from 'lucide-react';

const AIInsights = ({ prediction, loading }) => {
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6 xl:p-8 m-3 sm:m-4 lg:m-6">
        <div className="animate-pulse space-y-3 lg:space-y-4">
          <div className="h-4 sm:h-5 lg:h-6 bg-purple-200 rounded w-2/3"></div>
          <div className="h-3 lg:h-4 bg-purple-200 rounded w-1/2"></div>
          <div className="h-3 lg:h-4 bg-purple-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!prediction || prediction.predicted_price === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6 xl:p-8 m-3 sm:m-4 lg:m-6">
        <div className="text-center py-4 sm:py-6 lg:py-8 xl:py-12">
          <Brain className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16 text-gray-400 mx-auto mb-2 lg:mb-4" />
          <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-gray-900 mb-1 lg:mb-2">AI Market Analysis</h3>
          <p className="text-xs sm:text-sm lg:text-base text-gray-500">Select a stock to view AI predictions</p>
        </div>
      </div>
    );
  }
  const getTrendIcon = () => {
    if (prediction.trend === 'bullish') return <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />;
    if (prediction.trend === 'bearish') return <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />;
    return <Target className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />;
  };

  const getTrendColor = () => {
    if (prediction.trend === 'bullish') return 'text-green-600 bg-green-50 border-green-200';
    if (prediction.trend === 'bearish') return 'text-red-600 bg-red-50 border-red-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getConfidenceStyle = (confidence) => {
    if (confidence >= 75) return 'bg-emerald-500 text-white';
    if (confidence >= 60) return 'bg-blue-500 text-white';
    if (confidence >= 40) return 'bg-amber-500 text-white';
    return 'bg-red-500 text-white';
  };

  const priceDiff = prediction.predicted_price - prediction.current_price;
  const percentChange = ((priceDiff / prediction.current_price) * 100).toFixed(2);

  return (
    <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl shadow-sm lg:shadow-lg p-3 sm:p-4 lg:p-6 xl:p-8 m-3 sm:m-4 lg:m-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
        <div className="flex items-center space-x-2 lg:space-x-3">
          <div className="p-1 sm:p-1.5 lg:p-2 xl:p-3 bg-purple-100 rounded-lg lg:rounded-xl">
            <Brain className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base xl:text-lg">AI Analysis</h3>
            <p className="text-xs lg:text-sm text-gray-500 hidden sm:block">Machine Learning Prediction</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`inline-flex items-center px-1.5 sm:px-2 lg:px-3 xl:px-4 py-0.5 sm:py-1 lg:py-1.5 text-xs lg:text-sm xl:text-base font-medium rounded-full lg:rounded-xl ${getConfidenceStyle(prediction.confidence)}`}>
            {prediction.confidence}%
          </div>
          <p className="text-xs lg:text-sm text-gray-500 mt-0.5 hidden sm:block">Confidence</p>
        </div>
      </div>

      <div className="space-y-3 lg:space-y-4 xl:space-y-6">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
          <div className="bg-gray-50 rounded-lg lg:rounded-xl p-2 sm:p-3 lg:p-4 xl:p-6">
            <div className="text-xs lg:text-sm text-gray-500 mb-1 lg:mb-2">Current</div>
            <div className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base xl:text-lg truncate">
              ₹{prediction.current_price?.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg lg:rounded-xl p-2 sm:p-3 lg:p-4 xl:p-6">
            <div className="text-xs lg:text-sm text-blue-600 mb-1 lg:mb-2">Predicted</div>
            <div className="font-semibold text-blue-900 text-xs sm:text-sm lg:text-base xl:text-lg truncate">
              ₹{prediction.predicted_price?.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className={`rounded-lg lg:rounded-xl border p-2 sm:p-3 lg:p-4 xl:p-6 ${getTrendColor()}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
              {getTrendIcon()}
              <span className="font-medium text-xs sm:text-sm lg:text-base xl:text-lg">
                {prediction.trend?.toUpperCase()} TREND
              </span>
            </div>
            
            <div className="text-right">
              <div className={`font-bold text-xs sm:text-sm lg:text-base xl:text-lg ${priceDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {priceDiff >= 0 ? '+' : ''}₹{Math.abs(priceDiff).toFixed(2)}
              </div>
              <div className="text-xs lg:text-sm opacity-75">
                ({percentChange}%)
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 lg:pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 text-xs lg:text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
              <span className="truncate">Score: {prediction.factors?.trend_score}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
              <span className="truncate">Volume: {prediction.factors?.volume_signal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;

import React from 'react';
import { Brain, TrendingUp, TrendingDown, Target, Zap, Activity } from 'lucide-react';

const AIInsights = ({ prediction, loading }) => {
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4 m-4">
        <div className="animate-pulse space-y-3">
          <div className="h-5 bg-purple-200 rounded w-2/3"></div>
          <div className="h-4 bg-purple-200 rounded w-1/2"></div>
          <div className="h-4 bg-purple-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!prediction || !prediction.predicted_price || prediction.predicted_price === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-lg p-4 m-4">
        <div className="text-center py-6">
          <Brain className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h3 className="font-medium text-gray-900 mb-1">AI Market Analysis</h3>
          <p className="text-sm text-gray-500">Select a stock to view predictions</p>
        </div>
      </div>
    );
  }
  const currentPrice = parseFloat(prediction.current_price) || 0;
  const predictedPrice = parseFloat(prediction.predicted_price) || 0;
  const confidence = parseFloat(prediction.confidence) || 0;

  const getTrendIcon = () => {
    if (prediction.trend === 'bullish') return <TrendingUp className="w-4 h-4" />;
    if (prediction.trend === 'bearish') return <TrendingDown className="w-4 h-4" />;
    return <Target className="w-4 h-4" />;
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

  const priceDiff = predictedPrice - currentPrice;
  const percentChange = currentPrice > 0 ? ((priceDiff / currentPrice) * 100).toFixed(2) : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 m-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-purple-100 rounded-lg">
            <Brain className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">AI Analysis</h3>
            <p className="text-xs text-gray-500">Machine Learning Prediction</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getConfidenceStyle(confidence)}`}>
            {confidence.toFixed(0)}%
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Confidence</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Current</div>
            <div className="font-semibold text-gray-900 text-sm break-words">
              ₹{currentPrice.toLocaleString('en-IN', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-xs text-blue-600 mb-1">Predicted</div>
            <div className="font-semibold text-blue-900 text-sm break-words">
              ₹{predictedPrice.toLocaleString('en-IN', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </div>
          </div>
        </div>
        
        <div className={`rounded-lg border p-3 ${getTrendColor()}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getTrendIcon()}
              <span className="font-medium text-sm">
                {(prediction.trend || 'NEUTRAL').toUpperCase()} TREND
              </span>
            </div>
            
            <div className="text-right">
              <div className={`font-bold text-sm ${priceDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {priceDiff >= 0 ? '+' : ''}₹{Math.abs(priceDiff).toFixed(2)}
              </div>
              <div className="text-xs opacity-75">
                ({percentChange}%)
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex flex-col space-y-1 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <Activity className="w-3 h-3" />
              <span>Score: {prediction.factors?.trend_score || 'N/A'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>Volume: {prediction.factors?.volume_signal || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;

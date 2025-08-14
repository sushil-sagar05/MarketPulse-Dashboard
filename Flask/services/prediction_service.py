from datetime import datetime, timedelta
import statistics

class PredictionService:
    def __init__(self, stock_service):
        self.stock_service = stock_service
    
    def predict_stock_price(self, symbol, days=30):
        try:
            clean_symbol = symbol.replace('.NS', '')
            stock_data = self.stock_service.fetch_live_stock_data(clean_symbol, days)
            
            if len(stock_data) < 5:
                return self._default_prediction()
            
            prices = [float(item['close']) for item in stock_data[:10]]
            volumes = [int(item['volume']) for item in stock_data[:10]]
            
            current_price = prices[0]
            short_avg = sum(prices[:5]) / 5
            long_avg = sum(prices) / len(prices)
            avg_volume = sum(volumes) / len(volumes)
            recent_volume = volumes[0]
            
            trend_score = 0
            confidence = 50
            
            if short_avg > long_avg:
                trend_score += 2
                confidence += 15
            else:
                trend_score -= 1
                confidence += 5
            
            if recent_volume > avg_volume:
                trend_score += 1
                confidence += 10
            
            price_changes = []
            for i in range(1, min(5, len(prices))):
                change = (prices[i-1] - prices[i]) / prices[i] * 100
                price_changes.append(change)
            
            if price_changes:
                avg_change = sum(price_changes) / len(price_changes)
                if avg_change > 0:
                    trend_score += 1
                    confidence += 10
            
            prediction_change = trend_score * 0.5
            predicted_price = current_price * (1 + prediction_change / 100)
            
            confidence = min(max(confidence, 40), 85)
            
            trend = "bullish" if trend_score > 0 else "bearish" if trend_score < 0 else "neutral"
            
            return {
                'predicted_price': round(predicted_price, 2),
                'confidence': round(confidence, 1),
                'trend': trend,
                'current_price': round(current_price, 2),
                'factors': {
                    'trend_score': trend_score,
                    'volume_signal': 'high' if recent_volume > avg_volume else 'low'
                }
            }
        
        except Exception:
            return self._default_prediction()
    
    def _default_prediction(self):
        return {
            'predicted_price': 0.0,
            'confidence': 0.0,
            'trend': 'unknown',
            'current_price': 0.0,
            'factors': {
                'trend_score': 0,
                'volume_signal': 'unknown'
            }
        }

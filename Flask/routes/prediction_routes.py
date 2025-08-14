from flask import Blueprint, jsonify

def create_prediction_routes(prediction_service):
    prediction_api = Blueprint('prediction', __name__)
    
    @prediction_api.route('/api/predict/<symbol>')
    def predict_stock(symbol):
        prediction = prediction_service.predict_stock_price(symbol)
        if prediction['predicted_price'] == 0.0:
            return jsonify({'error': 'Prediction not available'}), 404
        return jsonify(prediction)
    
    return prediction_api

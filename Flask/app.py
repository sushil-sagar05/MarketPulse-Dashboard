import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from config import Config
from models.stock_model import StockModel
from services.stock_services import StockService
from services.prediction_service import PredictionService
from routes.api_routes import create_api_routes
from routes.prediction_routes import create_prediction_routes

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    config = Config()
    stock_model = StockModel(config)
    stock_service = StockService(stock_model)
    prediction_service = PredictionService(stock_service) 
    api_routes = create_api_routes(stock_service)
    prediction_routes = create_prediction_routes(prediction_service) 
    app.register_blueprint(api_routes)
    app.register_blueprint(prediction_routes) 
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(
        host=os.environ.get('FLASK_RUN_HOST', '127.0.0.1'),
        port=int(os.environ.get('FLASK_RUN_PORT', 5000)),
        debug=Config.DEBUG
    )

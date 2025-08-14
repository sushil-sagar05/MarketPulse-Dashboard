import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') 
    MONGODB_URI = os.environ.get('MONGODB_URI') 
    DATABASE_NAME = os.environ.get('DATABASE_NAME')
    COMPANIES_COLLECTION = 'companies'
    STOCK_DATA_COLLECTION = 'stock_data'
    DEBUG = os.environ.get('DEBUG', 'True').lower() == 'true'
    API_TIMEOUT = int(os.environ.get('API_TIMEOUT'))
    FLASK_ENV = os.environ.get('FLASK_ENV')

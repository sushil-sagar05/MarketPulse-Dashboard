from pymongo import MongoClient
from datetime import datetime
import json
from bson import ObjectId
import numpy as np

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, np.integer):
            return int(o)
        if isinstance(o, np.floating):
            return float(o)
        if isinstance(o, np.ndarray):
            return o.tolist()
        if isinstance(o, datetime):
            return o.isoformat()
        return json.JSONEncoder.default(self, o)

class StockModel:
    def __init__(self, config):
        self.client = MongoClient(config.MONGODB_URI)
        self.db = self.client[config.DATABASE_NAME]
        self.companies = self.db[config.COMPANIES_COLLECTION]
        self.stock_data = self.db[config.STOCK_DATA_COLLECTION]
    
    def save_stock_data(self, symbol, data):
        clean_data = []
        for entry in data:
            clean_entry = {
                'symbol': symbol,
                'date': entry['date'],
                'open': float(entry['open']),
                'high': float(entry['high']),
                'low': float(entry['low']),
                'close': float(entry['close']),
                'volume': int(entry['volume']),
                'timestamp': datetime.now()
            }
            clean_data.append(clean_entry)
        
        if clean_data:
            self.stock_data.delete_many({'symbol': symbol})
            self.stock_data.insert_many(clean_data)
    
    def get_stored_companies(self):
        cursor = self.companies.find({}, {'_id': 0})
        companies = []
        for doc in cursor:
            clean_doc = {
                'symbol': doc['symbol'],
                'name': doc['name'],
                'sector': doc.get('sector', 'Unknown'),
                'price': float(doc.get('price', 0)),
                'change': float(doc.get('change', 0)),
                'pchange': float(doc.get('pchange', 0)),
                'volume': int(doc.get('volume', 0)),
                'market_value': float(doc.get('market_value', 0))
            }
            companies.append(clean_doc)
        return companies
    
    def save_companies(self, companies):
        self.companies.delete_many({})
        clean_companies = []
        for company in companies:
            clean_company = {
                'symbol': company['symbol'],
                'name': company['name'],
                'sector': company.get('sector', 'Unknown'),
                'price': float(company.get('price', 0)),
                'change': float(company.get('change', 0)),
                'pchange': float(company.get('pchange', 0)),
                'volume': int(company.get('volume', 0)),
                'market_value': float(company.get('market_value', 0)),
                'updated_at': datetime.now()
            }
            clean_companies.append(clean_company)
        
        if clean_companies:
            self.companies.insert_many(clean_companies)
    
    def get_stored_stock_data(self, symbol, days=30):
        cursor = self.stock_data.find(
            {'symbol': symbol}, 
            {'_id': 0, 'timestamp': 0}
        ).sort('date', -1).limit(days)
        
        data = []
        for doc in cursor:
            clean_doc = {
                'date': doc['date'],
                'open': float(doc['open']),
                'high': float(doc['high']),
                'low': float(doc['low']),
                'close': float(doc['close']),
                'volume': int(doc['volume'])
            }
            data.append(clean_doc)
        
        return data

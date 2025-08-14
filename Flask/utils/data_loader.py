import json
import os
import random
from datetime import datetime, timedelta

class DataLoader:
    def __init__(self):
        self.base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.companies_data = self._load_companies()
        self.stock_templates = self._load_stock_templates()
    
    def _load_companies(self):
        companies_file = os.path.join(self.base_path, 'data', 'companies.json')
        try:
            with open(companies_file, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Warning: {companies_file} not found")
            return {"companies": []}
    
    def _load_stock_templates(self):
        templates_file = os.path.join(self.base_path, 'data', 'stock_templates.json')
        try:
            with open(templates_file, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Warning: {templates_file} not found")
            return {"price_ranges": {}, "volume_ranges": {}, "sector_trends": {}}
    
    def get_companies(self, limit=15):
        return self.companies_data["companies"][:limit]
    
    def get_company_by_symbol(self, symbol):
        for company in self.companies_data["companies"]:
            if company["symbol"] == symbol:
                return company
        return None
    
    def generate_stock_data(self, symbol, days=30):
        price_config = self.stock_templates["price_ranges"].get(symbol)
        volume_config = self.stock_templates["volume_ranges"].get(symbol)
        
        if not price_config or not volume_config:
            return self._generate_default_stock_data(symbol, days)
        
        base_price = price_config["base"]
        volatility = price_config["volatility"]
        trend = price_config["trend"]
        
        stock_data = []
        current_price = base_price
        
        for i in range(days):
            date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
            
            daily_trend = trend + random.uniform(-0.02, 0.02)
            daily_volatility = volatility * random.uniform(0.5, 1.5)
            
            open_price = current_price * (1 + random.uniform(-0.01, 0.01))
            high_price = open_price * (1 + random.uniform(0, daily_volatility))
            low_price = open_price * (1 - random.uniform(0, daily_volatility))
            close_price = open_price * (1 + daily_trend)
            
            volume = random.randint(volume_config["min"], volume_config["max"])
            
            stock_data.append({
                'date': date,
                'open': round(open_price, 2),
                'high': round(high_price, 2),
                'low': round(low_price, 2),
                'close': round(close_price, 2),
                'volume': volume
            })
            
            current_price = close_price * (1 + random.uniform(-0.005, 0.005))
        
        return stock_data[::-1]
    
    def _generate_default_stock_data(self, symbol, days):
        base_price = 1500.0
        stock_data = []
        current_price = base_price
        
        for i in range(days):
            date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
            
            daily_trend = random.uniform(-0.03, 0.03)
            volatility = random.uniform(0.01, 0.04)
            
            open_price = current_price * (1 + random.uniform(-0.01, 0.01))
            high_price = open_price * (1 + random.uniform(0, volatility))
            low_price = open_price * (1 - random.uniform(0, volatility))
            close_price = open_price * (1 + daily_trend)
            volume = random.randint(500000, 5000000)
            
            stock_data.append({
                'date': date,
                'open': round(open_price, 2),
                'high': round(high_price, 2),
                'low': round(low_price, 2),
                'close': round(close_price, 2),
                'volume': volume
            })
            
            current_price = close_price
        
        return stock_data[::-1]

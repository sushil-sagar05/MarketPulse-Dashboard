import sys
import os
from datetime import datetime

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.data_loader import DataLoader

class StockService:
    def __init__(self, stock_model):
        self.stock_model = stock_model
        self.data_loader = DataLoader()
    
    def get_companies(self, fetch_fresh=False, limit=15):
        if fetch_fresh:
            return self.fetch_and_store_companies(limit)
        
        stored_companies = self.stock_model.get_stored_companies()
        if stored_companies and len(stored_companies) >= 10:
            return stored_companies
        
        return self.fetch_and_store_companies(limit)
    
    def fetch_and_store_companies(self, limit=15):
        companies = self.data_loader.get_companies(limit)
        self.stock_model.save_companies(companies)
        print(f"Stored {len(companies)} companies from JSON data")
        return companies
    
    def fetch_live_stock_data(self, symbol, days=30):
        clean_symbol = symbol.replace('.NS', '')
        
        stored_data = self.stock_model.get_stored_stock_data(clean_symbol, days)
        if stored_data and len(stored_data) >= days // 2:
            print(f"Using stored data for {clean_symbol}")
            return stored_data
        
        print(f"Generating fresh mock data for {clean_symbol}")
        stock_data = self.data_loader.generate_stock_data(clean_symbol, days)
        
        if stock_data:
            self.stock_model.save_stock_data(clean_symbol, stock_data)
        
        return stock_data
    
    def get_market_status(self):
        from datetime import datetime
        current_hour = datetime.now().hour
        is_open = 9 <= current_hour <= 15
        status = 'OPEN' if is_open else 'CLOSED'
        
        return {
            'marketState': [{'marketStatus': status}],
            'timestamp': datetime.now().isoformat()
        }

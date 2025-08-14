from flask import Blueprint, jsonify, request

def create_api_routes(stock_service):
    api = Blueprint('api', __name__)
    
    @api.route('/api/companies')
    def get_companies():
        companies = stock_service.get_companies()
        return jsonify(companies)
    
    @api.route('/api/stock/<symbol>')
    def get_stock_data(symbol):
        days = request.args.get('days', 30, type=int)
        #print(days)
        stock_data = stock_service.fetch_live_stock_data(symbol, days)
        print(stock_data)
        if not stock_data:
            return jsonify({'error': 'Stock data not available'}), 404
        return jsonify(stock_data)
    
    return api

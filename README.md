### MarketPulse-Dashboard
A modern full-stack stock market dashboard featuring real-time data visualization, intelligent predictions, and comprehensive market analysis.

Real-time Stock Data: Live market data with interactive charts

Intelligent Predictions: Statistical analysis using technical indicators

Interactive Charts: Price and volume visualization with Chart.js

Responsive Design: Optimized for both desktop and mobile devices

Market Analysis: Technical indicators including moving averages, RSI, and MACD

Company Search: Filter and search through stock listings

AI-Powered Insights: Trend analysis with confidence scoring

🛠️ Technology Stack
Backend
Flask - Python web framework

MongoDB - NoSQL database for data storage

Python Libraries: pandas, numpy for data processing

REST API - Clean API design with proper error handling

Frontend
React 18 - Modern React with hooks

Vite - Fast build tool and development server

Tailwind CSS - Utility-first CSS framework

Chart.js - Interactive data visualization

Axios - HTTP client for API calls

📁 Project Structure
text
stockvision-pro/
├── backend/
│   ├── app.py                      # Flask application entry point
│   ├── config.py                   # Configuration management
│   ├── models/
│   │   └── stock_model.py          # Database interaction layer
│   ├── services/
│   │   ├── stock_services.py       # Business logic for stocks
│   │   └── prediction_service.py   # Prediction algorithms
│   ├── routes/
│   │   ├── api_routes.py           # Stock data endpoints
│   │   └── prediction_routes.py    # Prediction endpoints
│   ├── data/
│   │   ├── companies.json          # Company information
│   │   └── stock_templates.json    # Stock behavior templates
│   └── utils/
│       └── data_loader.py          # Data loading utilities
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppHeader.jsx       # Navigation header
│   │   │   ├── StockSelector.jsx   # Company selection sidebar
│   │   │   ├── MarketAnalyzer.jsx  # Main chart component
│   │   │   └── AIInsights.jsx      # Prediction display
│   │   ├── hooks/
│   │   │   └── useStockData.js     # Custom data fetching hook
│   │   ├── services/
│   │   │   └── api.js              # API service layer
│   │   └── App.jsx                 # Main application component
├── screenshots/                    # Project screenshots
└── README.md
🚀 Quick Start
Prerequisites
Node.js (v16 or higher)

Python 3.8+

MongoDB (local or cloud instance)

Backend Setup
Clone the repository

bash
git clone https://github.com/sushil-sagar05/MarketPulse-Dashboard.git
cd stockvision-pro/backend
Create virtual environment

bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies

bash
pip install -r requirements.txt
Environment configuration

bash
cp .env.example .env
# Edit .env with your configuration
Run the Flask server

bash
python app.py
The backend server will start on http://127.0.0.1:5000

Frontend Setup
Navigate to frontend directory

bash
cd ../frontend
Install dependencies

bash
npm install
Environment configuration

bash
cp .env.example .env
# Configure API endpoints
Start development server

bash
npm run dev
The frontend will be available at http://localhost:5173

⚙️ Environment Variables
Backend (.env)
text
SECRET_KEY=your-super-secret-key-here
MONGODB_URI=mongodb://localhost:27017/
DATABASE_NAME=stockvision_pro_db
DEBUG=True
FLASK_ENV=development
API_TIMEOUT=10000
FLASK_RUN_HOST=127.0.0.1
FLASK_RUN_PORT=5000
Frontend (.env)
text
VITE_API_BASE_URL=http://127.0.0.1:5000/api
VITE_API_TIMEOUT=10000
VITE_APP_ENV=development
📊 API Endpoints
Stock Data
GET /api/companies - Get list of available companies

GET /api/companies?refresh=true - Fetch fresh company data

GET /api/stock/{symbol}?days=30 - Get stock data for symbol

GET /api/predict/{symbol} - Get price prediction for symbol

Example Response
json
{
  "success": true,
  "data": [
    {
      "symbol": "RELIANCE",
      "name": "Reliance Industries Ltd",
      "price": 2856.78,
      "change": 12.45,
      "pchange": 0.44,
      "sector": "Energy"
    }
  ],
  "timestamp": "2025-08-15T02:38:12Z"
}
🎯 Key Features Explained
Intelligent Predictions
The application uses sophisticated statistical analysis including:

Moving Averages: Short-term vs long-term trend analysis

Volume Analysis: Trading volume patterns

Trend Scoring: Multi-factor trend evaluation

Confidence Metrics: Statistical confidence in predictions

Responsive Design
Mobile-First: Optimized for mobile devices

Desktop Enhanced: Rich desktop experience with sidebars

Touch-Friendly: Large touch targets and smooth interactions

Progressive Enhancement: Features scale with screen size

Data Management
Smart Caching: Efficient data caching strategy

Fallback System: Graceful handling of API limitations

Mock Data Generation: Realistic market data simulation

Error Recovery: Robust error handling and user feedback

🚧 Development Challenges & Solutions
API Integration Challenges
Problem: NSE India APIs blocked with Akamai protection

Problem: Yahoo Finance rate limiting ("Too Many Requests")

Solution: Implemented smart fallback system with realistic mock data generation

Machine Learning Adaptation
Problem: Insufficient historical data from EDA and data preprocessing

Problem: Multiple columns with missing values in financial datasets

Problem: CPU/memory limitations on free deployment tiers

Solution: Pivoted to sophisticated statistical approach using technical analysis indicators

Deployment Optimization
Problem: Complex ML models too resource-intensive for free tiers

Solution: Lightweight statistical algorithms providing intelligent predictions

Result: Production-ready application suitable for cloud deployment

text

### Frontend
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
🚀 Deployment
Using Render (Recommended)
Fork this repository
```
### Backend
pip install -r requirements.txt
python app.py



Project Link: https://github.com/sushil-sagar05/MarketPulse-Dashboard

Live Demo: https://market-pulse-dashboard.vercel.app/

⭐ Star this repository if you found it helpful!

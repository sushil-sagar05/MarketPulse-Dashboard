import { useState } from 'react';
import { useStockData } from './hooks/useStockData';
import AppHeader from './components/AppHeader';
import StockSelector from './components/StockSelector';
import MarketAnalyzer from './components/MarketAnalyzer';
import AIInsights from './components/AIInsights';

function App() {
  const { companies, selectedCompany, stockData, prediction, loading, error, selectCompany, refreshData } = useStockData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader 
        onRefresh={refreshData} 
        isLoading={loading.companies}
        onMenuToggle={handleMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 relative">
          <span>{error}</span>
        </div>
      )}
      
      <div className="flex h-[calc(100vh-56px)]">
        <div className="hidden lg:flex lg:w-80 xl:w-96 2xl:w-80 flex-shrink-0 border-r border-gray-200">
          <StockSelector
            companies={companies}
            selectedCompany={selectedCompany}
            onSelectCompany={selectCompany}
            loading={loading.companies}
            isOpen={true}
            onClose={() => {}}
          />
        </div>
        <div className="lg:hidden">
          <StockSelector
            companies={companies}
            selectedCompany={selectedCompany}
            onSelectCompany={selectCompany}
            loading={loading.companies}
            isOpen={isMobileMenuOpen}
            onClose={handleMenuClose}
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0 lg:max-w-none">
          <div className="flex-1 p-2 sm:p-4 lg:p-6 xl:p-8">
            <MarketAnalyzer
              stockData={stockData}
              company={selectedCompany}
              loading={loading.stockData}
            />
          </div>
          <div className="lg:hidden border-t border-gray-200">
            <AIInsights
              prediction={prediction}
              loading={loading.prediction}
            />
          </div>
        </div>
        <div className="hidden lg:flex lg:w-80 xl:w-96 2xl:w-80 flex-shrink-0 border-l border-gray-200">
          <AIInsights
            prediction={prediction}
            loading={loading.prediction}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

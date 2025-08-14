import  { useState } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, X } from 'lucide-react';

const StockSelector = ({ companies, selectedCompany, onSelectCompany, loading, isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');

  const getTrendIcon = (change) => {
    if (change > 0) return <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-500" />;
    return <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-red-500" />;
  };

  const getChangeClass = (change) => {
    if (change > 0) return 'text-green-600 bg-green-50 border-green-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = !sectorFilter || company.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  const uniqueSectors = [...new Set(companies.map(c => c.sector))];

  if (loading) {
    return (
      <div className={`bg-white border-r border-gray-200 h-full overflow-hidden transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed lg:static inset-y-0 left-0 z-40 w-80 lg:w-full xl:w-96`}>
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between lg:justify-start">
            <div className="h-6 lg:h-8 bg-gray-200 rounded w-32 lg:w-40 animate-pulse"></div>
            <button onClick={onClose} className="lg:hidden p-1">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="p-4 lg:p-6 space-y-3 lg:space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 sm:h-20 lg:h-24 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`bg-white border-r border-gray-200 h-full overflow-hidden flex flex-col transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed lg:static inset-y-0 left-0 z-40 w-80 lg:w-full xl:w-96`}>
        <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200 space-y-3 lg:space-y-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900">
              Stock Explorer ({filteredCompanies.length})
            </h2>
            <button onClick={onClose} className="lg:hidden p-1">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="w-4 h-4 lg:w-5 lg:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 lg:pl-12 pr-4 py-2 lg:py-3 border border-gray-300 rounded-lg text-sm lg:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="w-4 h-4 lg:w-5 lg:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="w-full pl-10 lg:pl-12 pr-8 py-2 lg:py-3 border border-gray-300 rounded-lg text-sm lg:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
            >
              <option value="">All Sectors</option>
              {uniqueSectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredCompanies.length === 0 ? (
            <div className="p-6 sm:p-8 lg:p-12 text-center text-gray-500">
              <div className="text-base sm:text-lg lg:text-xl mb-2">No stocks found</div>
              <div className="text-sm lg:text-base">Try adjusting your search or filter</div>
            </div>
          ) : (
            filteredCompanies.map((company) => (
              <div
                key={company.symbol}
                onClick={() => {
                  onSelectCompany(company);
                  onClose?.();
                }}
                className={`p-3 sm:p-4 lg:p-6 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                  selectedCompany?.symbol === company.symbol 
                    ? 'bg-blue-50 border-l-4 lg:border-l-6 border-l-blue-600 shadow-sm' 
                    : 'hover:shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0 pr-2 lg:pr-4">
                    <div className="flex items-center space-x-2 lg:space-x-3 mb-1 lg:mb-2">
                      <h3 className="text-sm lg:text-lg xl:text-xl font-bold text-gray-900 truncate">
                        {company.symbol}
                      </h3>
                      <span className={`inline-flex items-center px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full text-xs lg:text-sm font-medium border ${getChangeClass(company.change)}`}>
                        {getTrendIcon(company.change)}
                        <span className="ml-1">
                          {company.change >= 0 ? '+' : ''}{company.change}
                        </span>
                      </span>
                    </div>
                    
                    <p className="text-xs lg:text-sm xl:text-base text-gray-600 truncate mb-2 lg:mb-3 leading-relaxed">
                      {company.name}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2 lg:px-3 py-1 lg:py-1.5 text-xs lg:text-sm bg-indigo-100 text-indigo-800 rounded-full font-medium">
                        {company.sector}
                      </span>
                      <div className="text-xs lg:text-sm text-gray-500">
                        Vol: {(company.volume / 1000000).toFixed(1)}M
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-900 mb-1">
                      ₹{company.price?.toLocaleString()}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-500">
                      {company.pchange >= 0 ? '+' : ''}{company.pchange}%
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredCompanies.length > 0 && (
          <div className="p-3 lg:p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex justify-between text-xs lg:text-sm text-gray-600">
              <span>Market Cap Range</span>
              <span className="truncate ml-2">
                ₹{Math.min(...filteredCompanies.map(c => c.market_value || 0)).toLocaleString()} - 
                ₹{Math.max(...filteredCompanies.map(c => c.market_value || 0)).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StockSelector;

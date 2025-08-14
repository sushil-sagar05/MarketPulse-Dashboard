import { RefreshCw, BarChart3, Menu } from 'lucide-react';

const AppHeader = ({ onRefresh, isLoading, onMenuToggle }) => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex justify-between items-center h-14 lg:h-16 xl:h-18">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900">JarNox</h1>
              <p className="text-xs sm:text-sm lg:text-base text-gray-500 hidden sm:block">Real-time market insights</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            <div className="hidden sm:flex items-center space-x-2 lg:space-x-3 text-sm lg:text-base text-gray-600">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="hidden md:inline lg:text-base">Live Market</span>
            </div>
            
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center space-x-1 sm:space-x-1.5 lg:space-x-2 px-2 sm:px-3 lg:px-4 xl:px-6 py-1.5 lg:py-2 bg-gray-900 text-white text-sm lg:text-base font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            >
              <RefreshCw className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

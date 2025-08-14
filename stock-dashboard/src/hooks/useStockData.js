import { useState, useEffect, useCallback } from 'react';
import { stockAPI } from '../services/api';

export const useStockData = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState({
    companies: false,
    stockData: false,
    prediction: false
  });
  const [error, setError] = useState(null);

  const updateLoading = useCallback((key, value) => {
    setLoading(prev => ({ ...prev, [key]: value }));
  }, []);

  const fetchCompanies = useCallback(async (refresh = false) => {
    updateLoading('companies', true);
    setError(null);
    try {
      const data = await stockAPI.getCompanies(refresh);
      setCompanies(data);
    } catch (err) {
      setError('Failed to fetch companies');
    } finally {
      updateLoading('companies', false);
    }
  }, [updateLoading]);

  const fetchStockData = useCallback(async (symbol) => {
    updateLoading('stockData', true);
    try {
      const data = await stockAPI.getStockData(symbol);
      setStockData(data);
    } catch (err) {
      setStockData([]);
    } finally {
      updateLoading('stockData', false);
    }
  }, [updateLoading]);

  const fetchPrediction = useCallback(async (symbol) => {
    updateLoading('prediction', true);
    try {
      const data = await stockAPI.getPrediction(symbol);
      setPrediction(data);
    } catch (err) {
      setPrediction(null);
    } finally {
      updateLoading('prediction', false);
    }
  }, [updateLoading]);

  const selectCompany = useCallback(async (company) => {
    setSelectedCompany(company);
    setStockData([]);
    setPrediction(null);
    
    await Promise.all([
      fetchStockData(company.symbol),
      fetchPrediction(company.symbol)
    ]);
  }, [fetchStockData, fetchPrediction]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    selectedCompany,
    stockData,
    prediction,
    loading,
    error,
    selectCompany,
    refreshData: () => fetchCompanies(true),
  };
};

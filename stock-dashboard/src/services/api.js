import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
});
export const stockAPI = {
  async getCompanies(refresh = false, limit = 15) {
    const { data } = await api.get(`/companies?refresh=${refresh}&limit=${limit}`);
    return data;
  },

  async getStockData(symbol, days = 30) {
    const { data } = await api.get(`/stock/${symbol}?days=${days}`);
    return data;
  },

  async getPrediction(symbol) {
    const { data } = await api.get(`/predict/${symbol}`);
    return data;
  },
};

import axios from 'axios';
import queryString from 'query-string';

const baseURL = import.meta.env.VITE_BASE_API;

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params)
  }
});

publicClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      Accept: 'application/json'
    }
  };
});

publicClient.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
}, (err) => {
  throw err.response.data;
});

export default publicClient;
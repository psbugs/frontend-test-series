import axios from 'axios';

console.log('process.env.NODE_ENV',process.env.NODE_ENV)
const BASE_URL =
  process.env.NODE_ENV  === 'production'
    ? 'https://backend-test-series-apis.onrender.com/api'
    : 'http://localhost:3002/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Intercept each request to add Authorization header if token exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or use sessionStorage if needed
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const ApiService = {
  get: (url: string, config = {}) => axiosInstance.get(url, config),
  post: (url: string, data: any, config = {}) => axiosInstance.post(url, data, config),
  put: (url: string, data: any, config = {}) => axiosInstance.put(url, data, config),
  delete: (url: string, config = {}) => axiosInstance.delete(url, config),
};

export default ApiService;

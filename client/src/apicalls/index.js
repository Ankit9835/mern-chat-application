import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api', // 👈 This triggers the proxy
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  }
});

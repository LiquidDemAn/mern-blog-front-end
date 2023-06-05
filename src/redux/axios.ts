import axios from 'axios';
import { getToken } from '../local-storage';

export const customeAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4444/'
});

customeAxios.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    // @ts-ignore
    config.headers.Authorization = token;
  }
  return config;
});

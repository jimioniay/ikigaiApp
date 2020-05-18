import axios from 'axios';
import AuthServices from './authService';

const baseURL = `${window.location.origin}/api/v1`;
const instance = axios.create({
  baseURL,
  headers: {
    'Cache-Control': 'no-cache',
  },
});

instance.defaults.headers.common.Authorization = AuthServices.getToken();

export default instance;

import axios from 'axios';
import AuthServices from './authService';

const baseURL = `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1`;
const instance = axios.create({
  baseURL,
  headers: {
    'Cache-Control': 'no-cache',
  },
});

instance.defaults.headers.common.Authorization = AuthServices.getToken();

export default instance;

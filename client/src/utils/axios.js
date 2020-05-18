import axios from 'axios';
import AuthServices from './authService';
import misc from '../utils/misc';

const { getBaseURL } = misc;
const base = getBaseURL('server');
const baseURL = `${base}/api/v1`;
const instance = axios.create({
  baseURL,
  headers: {
    'Cache-Control': 'no-cache',
  },
});

instance.defaults.headers.common.Authorization = AuthServices.getToken();

export default instance;

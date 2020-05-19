import axios from 'axios';
import AuthServices from './authService';
import misc from '../utils/misc';

const { getBaseURL } = misc;
const baseURL = `${getBaseURL('server')}/api/v1`;
const instance = axios.create({
  baseURL,
  headers: {
    'Cache-Control': 'no-cache',
  },
});

instance.defaults.headers.common.Authorization = AuthServices.getToken();

export default instance;

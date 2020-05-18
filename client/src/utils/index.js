import api from './api';
import Misc from './misc';
import AuthService from './authService';
const { getQueryParams, decodeToken, getBaseURL } = Misc;
export default { api, getQueryParams, decodeToken, AuthService, getBaseURL };

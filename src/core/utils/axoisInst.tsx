import axios from 'axios';
import { constants } from './constants';

const axiosInstance = axios.create({
  baseURL: constants.baseUrl,
  headers: {
    Authorization: 'Api-Key cMhfWvLs.OnxdEp1sNEm4zajmLRm7uttbYJVXj2a1',
  },
});
export default axiosInstance;

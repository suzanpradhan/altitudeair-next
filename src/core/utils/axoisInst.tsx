import axios from 'axios';
import { constants } from './constants';

const axiosInstance = axios.create({
  baseURL: constants.baseUrl,
  headers: {
    'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
  },
});
export default axiosInstance;

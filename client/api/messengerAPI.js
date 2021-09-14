import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { variables } from '../assets/constants';

const instance = axios.create({
  baseURL: variables.ngrok,
});

instance.interceptors.request.use(
  async (config) => {    
    const token = await SecureStore.getItemAsync('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;

import axios from 'axios';
import { createContext, useContext } from 'react';
import { Alert } from 'react-native';
import { useAuth } from './AuthContext';

type AxiosContextType = ReturnType<typeof axiosContextFactory>;

const axiosContextFactory = () => {
  const { token, logout } = useAuth();

  const publicAxios = axios.create({
    baseURL: 'https://bloomapp.herokuapp.com',
  });

  const privateAxios = axios.create({
    baseURL: 'https://bloomapp.herokuapp.com',
  });

  privateAxios.interceptors.request.use(
    async (config) => {
      if (!config.headers.Authorization && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  privateAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        await logout();
      }

      if (error.response.data.error.message) {
        Alert.alert('Error', error.response.data.error.message);
      }

      const developmentMode = process.env.NODE_ENV === 'development';
      if (developmentMode) {
        console.log(JSON.parse(JSON.stringify(error.response)));
      }

      return Promise.reject(error);
    }
  );

  publicAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.data.error.message) {
        Alert.alert('Error', error.response.data.error.message);
      }

      return Promise.reject(error);
    }
  );

  return {
    publicAxios,
    privateAxios,
  };
};

const initialstate: AxiosContextType = {
  publicAxios: axios.create({
    baseURL: 'https://bloomapp.herokuapp.com',
  }),
  privateAxios: axios.create({
    baseURL: 'https://bloomapp.herokuapp.com',
  }),
};

const AxiosContext = createContext(initialstate);

const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
  const { Provider } = AxiosContext;
  const value = axiosContextFactory();

  return <Provider value={value}>{children}</Provider>;
};

const useAxios = () => useContext(AxiosContext);

export { AxiosProvider, useAxios };

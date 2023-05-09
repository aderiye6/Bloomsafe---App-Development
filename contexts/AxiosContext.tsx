import axios from 'axios';
import { createContext, useContext } from 'react';
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

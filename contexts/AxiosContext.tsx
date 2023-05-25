import axios from "axios";
import { createContext, useContext } from "react";
import { Alert } from "react-native";
import { useAuth } from "./AuthContext";

const baseURL = process.env.BASE_URL ?? "https://bloomapp.herokuapp.com";

type AxiosContextType = ReturnType<typeof axiosContextFactory>;

const axiosContextFactory = () => {
  const { token, logout } = useAuth();

  const publicAxios = axios.create({
    baseURL,
  });

  const privateAxios = axios.create({
    baseURL,
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

      if (error.response.data?.message) {
        Alert.alert("Error", error.response?.data?.message);
      }

      const developmentMode = process.env.NODE_ENV === "development";
      if (developmentMode) {
        console.log(error.response.config.data, "err");
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
        Alert.alert("Error", error.response.data.error.message);
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
    baseURL,
  }),
  privateAxios: axios.create({
    baseURL,
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

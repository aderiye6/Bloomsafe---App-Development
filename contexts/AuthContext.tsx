import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../types';

type AuthContextType = ReturnType<typeof authContextFactory>;

const authContextFactory = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const getToken = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem('token', token);
    setToken(token);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    getToken();
  }, []);

  return {
    user,
    token,
    login,
    logout,
  };
};

const initialstate: AuthContextType = {
  user: null,
  token: null,
  login: async (token: string) => {},
  logout: async () => {},
};

const AuthContext = createContext(initialstate);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const value = authContextFactory();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

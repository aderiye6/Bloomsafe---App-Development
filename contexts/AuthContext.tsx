import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { User } from '../types';

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  setToken: Dispatch<SetStateAction<string | null>>;
};

const authContextFactory = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const getToken = useCallback(async () => {
    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (newToken: string) => {
    await AsyncStorage.setItem('token', newToken);
    setToken(newToken);
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
    setToken,
  };
};

const initialstate: AuthContextType = {
  user: null,
  token: null,
  login: async (token: string) => {},
  logout: async () => {},
  setToken: () => {},
};

const AuthContext = createContext(initialstate);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = authContextFactory();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../types';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

function ProtectedScreen({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation<NavigationProps>();
  const { token } = useAuth();
  useEffect(() => {
    if (!token) {
      navigation.navigate('Register');
    }
  }, [token]);
  return <>{children}</>;
}

export default ProtectedScreen;

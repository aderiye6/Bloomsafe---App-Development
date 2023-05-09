import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button/Button';
import Input from '../components/Forms/Input';
import PageSpinner from '../components/Spinner/PageSpinner';
import AlertText from '../components/Text/AlertText';
import HeaderText from '../components/Text/HeaderText';
import { useAuth } from '../contexts/AuthContext';
import { useAxios } from '../contexts/AxiosContext';
import { RootStackParamList } from '../types';
import Screen from './Screen';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { publicAxios } = useAxios();
  const { login } = useAuth();

  const { isLoading, mutate } = useMutation({
    mutationFn: async () => {
      const response = await publicAxios.post('/login', {
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.token) login(data.token);
    },
  });

  const handleLogin = () => {
    if (!email || !password) return;
    mutate();
  };

  if (isLoading) return <PageSpinner />;

  return (
    <Screen>
      <View style={styles.container}>
        <AlertText text={'Welcome Back!'} />
        <HeaderText text={'Enter your details'} />
        <Text>Quis cras tellus nibh egestas mauris venenatis nibh.</Text>
        <Input
          type='email'
          label='E-mail'
          value={email}
          onChange={(text) => setEmail(text)}
        />
        <Input
          type='password'
          label='Password'
          value={password}
          onChange={(text) => setPassword(text)}
        />
        <View
          style={{
            paddingTop: 20,
            gap: 20,
          }}
        >
          <Button text='Login' onPress={handleLogin} disabled={isLoading} />
          <Button
            text='Create Account'
            onPress={() => navigation.navigate('Register')}
            variant='white'
          />
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
});

export default LoginScreen;

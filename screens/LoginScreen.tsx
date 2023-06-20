import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button/Button';
import Input from '../components/Forms/Input';
import PageSpinner from '../components/Spinner/PageSpinner';
import AlertText from '../components/Text/AlertText';
import HeaderText from '../components/Text/HeaderText';
import { useAuth } from '../contexts/AuthContext';
import { useAxios } from '../contexts/AxiosContext';
import { RootStackParamList } from '../types';
import Screen from './Screen';
import { useLoginAccountMutation } from '../contexts/api';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const { login } = useAuth();
 const [loginAccount, {isLoading}]= useLoginAccountMutation()

  const handleLogin = async() => {
    if (!email || !password) return;
    else{
      const d={
     
        email,
        password,
       
      }
    
      try {
         const data:any = await loginAccount(d).unwrap()
        if(data){
          const token = data?.token
          login(token)
          navigation.replace('HomeScreen')
        }
      } catch (error:any) {
        // console.log(error)
        Toast.show({
          type: 'error',
          text1: '',
          text2: error?.error ??''
        });
      }
    }
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

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button/Button';
import Input from '../components/Forms/Input';
import PageSpinner from '../components/Spinner/PageSpinner';
import HeaderText from '../components/Text/HeaderText';
import { BLOOM_GREEN } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { useAxios } from '../contexts/AxiosContext';
import { RootStackParamList } from '../types';
import Screen from './Screen';
import { useRegisterAccountMutation } from '../contexts/api';
import Toast from 'react-native-toast-message';


type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('')
  const [registerAccount, {isLoading}] = useRegisterAccountMutation()
  const { login} = useAuth()
  const handleSignup = async() => {
    if (!fullName || !email || !password || !username) return;
    else{
      const d={
        fullname:fullName,
        email,
        password,
        username
      }
    
      try {
         const data:any = await registerAccount(d).unwrap()
        if(data){
          const token = data[0]?.token
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
        <HeaderText text={'Create an account'} />
        <Text>Quis cras tellus nibh egestas mauris venenatis nibh.</Text>
        <Input
          type='text'
          label='Full Name'
          value={fullName}
          onChange={(text) => setFullName(text)}
        />
         <Input
          type='text'
          label='Username'
          value={username}
          onChange={(text) => setUsername(text)}
        />
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
          <Button
            text='Create Account'
            onPress={handleSignup}
            disabled={isLoading}
          />
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  color: BLOOM_GREEN,
                }}
              >
                sign in
              </Text>
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

export default RegisterScreen;

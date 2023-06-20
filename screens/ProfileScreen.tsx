import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import Button from '../components/Button/Button';
import Input from '../components/Forms/Input';
import PageSpinner from '../components/Spinner/PageSpinner';
import AlertText from '../components/Text/AlertText';
import { useAuth } from '../contexts/AuthContext';
import { useAxios } from '../contexts/AxiosContext';
import { RootStackParamList } from '../types';
import ProtectedScreen from './ProtectedScreen';
import Screen from './Screen';
import { useNavigation } from '@react-navigation/native';
import { useUpdatePasswordMutation } from '../contexts/api';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { logout } = useAuth();
  const { privateAxios } = useAxios();
  const { isLoading, data } = useQuery(['profile'], async () => {
    const response = await privateAxios.get('/profile');
    return response.data;
  });

 const [updatePassword, {isLoading:Loading}]=  useUpdatePasswordMutation()


  const handleUpdatePassword = async() => {
    if (!oldPassword || !newPassword) return;

    else{
      const d=  {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: newPassword,
      }
      try {
        const data:any = await updatePassword(d).unwrap()
       if(data){
       
       }
     } catch (error:any) {
      //  console.log(error)
       Toast.show({
         type: 'error',
         text1: '',
         text2: error?.error ??''
       });
     }
    }
   
  };

  return (
    <Screen back={() => navigation.goBack()} title='Settings'>
      <ProtectedScreen>
        {isLoading ? (
          <PageSpinner />
        ) : (
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              gap: 20,
            }}
            style={styles.container}
          >
            <Input
              type='text'
              label='Full Name'
              value={data.fullname}
              onChange={() => {}}
            />

            <Input
              type='email'
              label='Email'
              value={data.email}
              onChange={() => {}}
            />

            <AlertText text='Update Password' />

            <Input
              type='password'
              label='Old Password'
              value={oldPassword}
              onChange={(text) => setOldPassword(text)}
            />

            <Input
              type='password'
              label='New Password'
              value={newPassword}
              onChange={(text) => setNewPassword(text)}
            />

            <Button
              text={Loading ?'Loading...': "Update Password"}
              onPress={handleUpdatePassword}
              disabled={Loading}
            />
            <Button variant='white' text='Logout' onPress={() => {
              logout()
              // navigation.replace('Login')
            }} />
          </ScrollView>
        )}
      </ProtectedScreen>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default ProfileScreen;

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Button from '../components/Button/Button';
import Input from '../components/Forms/Input';
import PageSpinner from '../components/Spinner/PageSpinner';
import AlertText from '../components/Text/AlertText';
import HeaderText from '../components/Text/HeaderText';
import { useAuth } from '../contexts/AuthContext';
import { useAxios } from '../contexts/AxiosContext';
import { RootStackParamList } from '../types';
import ProtectedScreen from './ProtectedScreen';
import Screen from './Screen';

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

  const { mutate, isLoading: isChangingPassword } = useMutation({
    mutationFn: async () => {
      const response = await privateAxios.put('/password/change', {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: newPassword,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.message) Alert.alert('Password Changed', data.message);
    },
  });

  const handleUpdatePassword = () => {
    if (!oldPassword || !newPassword) return;
    mutate();
  };

  return (
    <Screen back={() => navigation.goBack()}>
      <ProtectedScreen>
        {isLoading ? (
          <PageSpinner />
        ) : (
          <View style={styles.container}>
            <HeaderText text={'Settings'} />
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
              text='Update Password'
              onPress={handleUpdatePassword}
              disabled={isChangingPassword}
            />
            <Button variant='white' text='Logout' onPress={() => logout()} />
          </View>
        )}
      </ProtectedScreen>
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

export default ProfileScreen;

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button/Button';
import Input from '../components/Forms/Input';
import AlertText from '../components/Text/AlertText';
import HeaderText from '../components/Text/HeaderText';
import { RootStackParamList } from '../types';
import Screen from './Screen';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

const ForgotPassword: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  return (
    <Screen back={() => navigation.goBack()}>
      <View style={styles.container}>
        <AlertText text='Forgot Password!' />
        <HeaderText text='Enter your email' />
        <Text>
          Enter the email associated with your account and we&apos;ll send a
          verification code to your email
        </Text>
        <Input
          type='email'
          label='Email'
          value={email}
          onChange={(text) => setEmail(text)}
        />
        <Button text='Send Verification Code' onPress={() => undefined} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
  },
});

export default ForgotPassword;

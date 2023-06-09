import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import Onboarding from '../components/Onboarding/Onboarding';
import { RootStackParamList } from '../types';
import Screen from './Screen';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const exitOnboarding = () => {
    AsyncStorage.setItem('appLaunched', 'true');
    navigation.push('Home');
  };
  return (
    <Screen>
      <Onboarding exit={exitOnboarding} />
    </Screen>
  );
};

export default OnboardingScreen;

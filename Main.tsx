import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from './contexts/AuthContext';
import useFirstLaunch from './hooks/useFirstLaunch';
import ForgotPassword from './screens/ForgotPassword';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ResultDetails from './screens/ResultDetails';
import SnapChipScreen from './screens/SnapChipScreen';
import TestHistory from './screens/TestHistory';
import { RootStackParamList } from './types';
import Toast from 'react-native-toast-message'
const Stack = createNativeStackNavigator<RootStackParamList>();

const Main: React.FC = () => {
  const { isFirstLaunch, isAppReady } = useFirstLaunch();
  const { token } = useAuth();

  return (
   <>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          isAppReady && isFirstLaunch ? 'Onboarding' : token ? 'Home' : 'Register'
        }
        screenOptions={{ headerShown: false }}
      >
        {isFirstLaunch ? (
          <Stack.Screen name='Onboarding' component={OnboardingScreen} />
        ) : null}
        {!token ? (
          <Stack.Screen name='Register' component={RegisterScreen} />
        ) : null}
        {!token ? <Stack.Screen name='Login' component={LoginScreen} /> : null}
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='SnapChip' component={SnapChipScreen} />
        <Stack.Screen name='History' component={TestHistory} />
        <Stack.Screen name='ResultDetails' component={ResultDetails} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
    <Toast />
   </>
  );
};

export default Main;

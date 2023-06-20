import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
const Stack = createNativeStackNavigator<RootStackParamList>();

const Main: React.FC = () => {
  const { isFirstLaunch, isAppReady } = useFirstLaunch();
  const { token } = useAuth();

  return (
   <>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          isAppReady && isFirstLaunch ? 'Onboarding' : token ? 'HomeScreen' : 'Login'
        }
        screenOptions={{ headerShown: false }}
      >
        {isFirstLaunch ? (
          <Stack.Screen name='Onboarding' component={OnboardingScreen} />
        ) : null}
        {!token ? (
          <Stack.Screen name='Register' component={RegisterScreen} />
        ) : null}
         <Stack.Screen name='Login' component={LoginScreen} /> 
        <Stack.Screen name='HomeScreen' 
         component={BottomStack} />
        <Stack.Screen name='SnapChip' component={SnapChipScreen} />
        {/* <Stack.Screen name='History' component={TestHistory} /> */}
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


const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomStack= () => (
  


  <Tab.Navigator
      
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'} // Active and inactive icon names
                size={size}
                color={color}
              />
            ),
            tabBarLabel: 'Home', // Custom tab label
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="History"
          component={TestHistory}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'time' : 'time-outline'} // Active and inactive icon names
                size={size}
                color={color}
              />
            ),
            tabBarLabel: 'History', // Custom tab label
            headerShown: false,
          }}
        />
      </Tab.Navigator>
);
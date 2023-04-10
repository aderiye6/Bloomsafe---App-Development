import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { AppStateStatus, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppState } from './hooks/useAppState';
import useFirstLaunch from './hooks/useFirstLaunch';
import { useOnlineManager } from './hooks/useOnlineManager';
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import SnapChipScreen from './screens/SnapChipScreen';
import { RootStackParamList } from './types';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}
const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const { isAppReady, isFirstLaunch } = useFirstLaunch();
  useOnlineManager();
  useAppState(onAppStateChange);

  if (!isAppReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isFirstLaunch ? 'Onboarding' : 'Home'}
            screenOptions={{ headerShown: false }}
          >
            {isFirstLaunch ? (
              <Stack.Screen name='Onboarding' component={OnboardingScreen} />
            ) : null}
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='SnapChip' component={SnapChipScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;

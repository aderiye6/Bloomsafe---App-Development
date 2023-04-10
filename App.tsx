import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [appIsReady, setAppIsReady] = React.useState(false);
  const [firstLaunch, setFirstLaunch] = React.useState(false);

  useOnlineManager();

  useAppState(onAppStateChange);

  React.useEffect(() => {
    async function prepare() {
      try {
        const appLaunched = await AsyncStorage.getItem('appLaunched');
        if (
          appLaunched === null ||
          appLaunched === undefined ||
          appLaunched === 'false'
        ) {
          setFirstLaunch(true);
          AsyncStorage.setItem('appLaunched', 'false');
        } else {
          setFirstLaunch(false);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  React.useEffect(() => {
    const closeSplashScreen = async () => {
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    };

    closeSplashScreen();
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={firstLaunch ? 'Onboarding' : 'Home'}
            screenOptions={{ headerShown: false }}
          >
            {firstLaunch ? (
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

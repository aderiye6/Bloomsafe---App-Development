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
import Main from './Main';
import { AuthProvider } from './contexts/AuthContext';
import { AxiosProvider } from './contexts/AxiosContext';
import { useAppState } from './hooks/useAppState';
import useFirstLaunch from './hooks/useFirstLaunch';
import { useOnlineManager } from './hooks/useOnlineManager';
import { RootStackParamList } from './types';
import { Provider } from 'react-redux';
import { store } from './contexts/store';

import Toast from 'react-native-toast-message';
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
  const { isAppReady } = useFirstLaunch();
  useOnlineManager();
  useAppState(onAppStateChange);

  if (!isAppReady) {
    return null;
  }

  return (
    <>
      <Toast />
    <Provider store={store}>

    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AxiosProvider>
          <SafeAreaProvider>
            <Main />
          </SafeAreaProvider>
        </AxiosProvider>
      </AuthProvider>
    </QueryClientProvider>
    </Provider>
    </>

  );
};

export default App;

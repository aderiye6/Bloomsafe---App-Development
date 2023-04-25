import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useFirstLaunch() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const appLaunched = await AsyncStorage.getItem('appLaunched');
        if (appLaunched === null || appLaunched === undefined) {
          AsyncStorage.setItem('appLaunched', 'false');
        }

        if (appLaunched === 'true') {
          setIsFirstLaunch(false);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsAppReady(true);
        await SplashScreen.hideAsync();
      }
    };
    checkFirstLaunch();
  }, []);

  return { isFirstLaunch, isAppReady };
}

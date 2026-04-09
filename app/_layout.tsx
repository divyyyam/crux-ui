import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '../src/store/authStore';

  import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
  import * as SplashScreen from 'expo-splash-screen';

  export default function RootLayout() {
    const colorScheme = useColorScheme();
    const { accessToken, initialize } = useAuthStore();
    const segments = useSegments();
    const router = useRouter();

    const [fontsLoaded] = useFonts({
      Inter_400Regular,
      Inter_500Medium,
      Inter_600SemiBold,
    });

    useEffect(() => {
      initialize();
    }, []);

    useEffect(() => {
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
      return null;
    }

    // Auth redirects Disabled for MVP UI construction
    /*
    useEffect(() => {
      const inAuthGroup = segments[0] === '(auth)';
      
      if (!accessToken && !inAuthGroup) {
        router.replace('/login');
      } else if (accessToken && inAuthGroup) {
        router.replace('/(tabs)');
      }
    }, [accessToken, segments]);
    */

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

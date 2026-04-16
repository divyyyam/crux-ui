import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme, View } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme as useNWColorScheme } from 'nativewind';
import '../global.css';

import { useAuthStore } from '../src/store/authStore';
import { useThemeStore } from '../src/store/themeStore';
import client from '../src/api/client';

import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
  const { setColorScheme } = useNWColorScheme();
  const systemColorScheme = useRNColorScheme();
  const { theme, initializeTheme } = useThemeStore();
  const { accessToken, initialize, isInitialized, user, setUser, logout } = useAuthStore();
  
  const segments = useSegments();
  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  // 1. Initialize Stores
  useEffect(() => {
    const init = async () => {
      await Promise.all([initialize(), initializeTheme()]);
      setIsAuthChecking(false);
    };
    init();
  }, []);

  // 2. Sync Theme with NativeWind (Now immediate)
  useEffect(() => {
    const targetTheme = theme === 'system' ? systemColorScheme : theme;
    setColorScheme(targetTheme === 'dark' ? 'dark' : 'light');
  }, [theme, systemColorScheme]);

  // 3. Hydrate User Profile (Breaks the authStore require cycle)
  useEffect(() => {
    if (!isInitialized || !accessToken || user) return;

    const fetchUser = async () => {
      try {
        const response = await client.get('/auth/me');
        if (response.data && response.data.success) {
          setUser(response.data.data.user || response.data.data);
        }
      } catch (error) {
        console.log('Failed to fetch user in _layout', error);
        await logout();
      }
    };
    fetchUser();
  }, [accessToken, isInitialized, user]);

  // 4. Handle Splash Screen
  useEffect(() => {
    if (fontsLoaded && isInitialized && !isAuthChecking) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isInitialized, isAuthChecking]);

  // 5. Navigation Guard
  useEffect(() => {
    if (!isInitialized || isAuthChecking) return;

    const segs = segments as string[];
    const inAuthGroup = segs[0] === '(auth)';
    const isRoot = segs.length === 0 || segs[0] === 'index';

    if (!accessToken && !inAuthGroup && !isRoot) {
      router.replace('/');
    } else if (accessToken && (inAuthGroup || isRoot)) {
      router.replace('/(tabs)');
    }
  }, [accessToken, segments, isInitialized, isAuthChecking]);

  if (!fontsLoaded || !isInitialized || isAuthChecking) {
    return null;
  }

  const activeTheme = theme === 'system' ? systemColorScheme : theme;

  return (
    <View style={{ flex: 1, backgroundColor: activeTheme === 'dark' ? '#000000' : '#ffffff' }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style={activeTheme === 'dark' ? 'light' : 'dark'} />
    </View>
  );
}

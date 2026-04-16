import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, useColorScheme, LayoutChangeEvent } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';
import { useThemeStore } from '../../src/store/themeStore';
import * as Haptics from 'expo-haptics';
import { ChevronRight, User as UserIcon, Bell, Shield, CircleHelp, Smartphone, Sun, Moon, Monitor } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import client from '../../src/api/client';

export default function SettingsScreen() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const { theme, setTheme } = useThemeStore();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Slider Animation
  const [containerWidth, setContainerWidth] = useState(0);
  const sliderX = useSharedValue(0);

  const onContainerLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  useEffect(() => {
    if (containerWidth === 0) return;
    const padding = 6;
    const itemWidth = (containerWidth - padding * 2) / 3;
    const index = theme === 'light' ? 0 : theme === 'dark' ? 1 : 2;
    sliderX.value = withSpring(index * itemWidth, { damping: 20, stiffness: 120 });
  }, [theme, containerWidth]);

  const animatedSliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sliderX.value }],
    width: containerWidth ? (containerWidth - 12) / 3 : 0,
  }));

  const handleLogout = async () => {
    // Fire and forget backend logout to ensure immediate UI feedback
    client.post('/auth/logout').catch((error) => {
      console.log('Backend logout failed or not supported', error);
    });
    
    await logout();
    router.replace('/');
  };

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'system') => {
    if (theme === newTheme) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setTheme(newTheme);
  };

  const menuItems = [
    { icon: UserIcon, label: 'Account Profile' },
    { icon: Smartphone, label: 'Vehicle Pairing' },
    { icon: Bell, label: 'Notifications' },
    { icon: Shield, label: 'Privacy & Security' },
    { icon: CircleHelp, label: 'Help & Support' },
  ];

  const profileInitials = user?.name && user.name.toLowerCase() !== 'puttar' ? user.name.charAt(0).toUpperCase() : 'U';
  const profileName = user?.name && user.name.toLowerCase() !== 'puttar' ? user.name : 'User';
  const profileEmail = user?.email || 'user@crux.co';
  const displayDeviceName = user?.pairedDeviceName && user.pairedDeviceName.toLowerCase() !== 'puttar' 
    ? user.pairedDeviceName 
    : user?.pairedDeviceId; // ← Fixed: added ?. to handle null user

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkbase' : 'bg-[#FAFAFA]'}`}>
      <ScrollView className="flex-1 px-6 pt-8">
        
        {/* Header */}
        <View className="mb-10">
          <Text className={`text-4xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Settings</Text>
          <Text className={`text-base font-inter mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Manage your account & preferences</Text>
        </View>

        {/* Premium Profile Card */}
        <View className={`p-5 rounded-3xl mb-4 flex-row items-center border ${isDark ? 'bg-darkcard border-darkcard' : 'bg-white border-gray-100 shadow-sm'}`}>
          <View className={`w-14 h-14 rounded-full mr-4 items-center justify-center ${isDark ? 'bg-[#1A1A1A]' : 'bg-gray-100'}`}>
            <Text className={`text-xl font-inter-semibold ${isDark ? 'text-neon' : 'text-darkbase'}`}>{profileInitials}</Text>
          </View>
          <View className="flex-1">
            <Text className={`text-lg font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{profileName}</Text>
            <Text className={`text-sm font-inter ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-0.5`}>{profileEmail}</Text>
          </View>
          <TouchableOpacity className={`px-4 py-2 rounded-full ${isDark ? 'bg-[#1A1A1A]' : 'bg-gray-100'}`}>
            <Text className={`text-xs font-inter-medium ${isDark ? 'text-white' : 'text-darkbase'}`}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Device Status */}
        {user?.pairedDeviceId && (
          <View className={`px-5 py-4 rounded-2xl mb-8 flex-row items-center border ${isDark ? 'bg-[#39FF14]/5 border-[#39FF14]/20' : 'bg-green-50 border-green-100'}`}>
            <View className={`w-2 h-2 rounded-full bg-green-500 mr-3`} />
            <Text className={`flex-1 text-sm font-inter-medium ${isDark ? 'text-[#39FF14]' : 'text-green-700'}`}>
              Active: {displayDeviceName}
            </Text>
          </View>
        )}
        {!user?.pairedDeviceId && (
          <View className={`px-5 py-4 rounded-2xl mb-8 flex-row items-center border ${isDark ? 'bg-darkcard border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
            <View className={`w-2 h-2 rounded-full bg-gray-500 mr-3`} />
            <Text className={`flex-1 text-sm font-inter-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No vehicle paired
            </Text>
          </View>
        )}

        {/* Appearance Switcher */}
        <View className="mb-8">
          <Text className={`text-xs font-inter-medium mb-3 uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Appearance</Text>
          <View 
            onLayout={onContainerLayout}
            className={`p-1.5 rounded-2xl flex-row border relative ${isDark ? 'bg-darkcard border-[#222222]' : 'bg-white border-gray-100 shadow-sm'}`}
          >
            {/* Sliding Highlighter */}
            <Animated.View 
              style={[
                { position: 'absolute', top: 6, bottom: 6, left: 6, borderRadius: 12 },
                isDark ? { backgroundColor: '#222222' } : { backgroundColor: '#F3F4F6' },
                animatedSliderStyle
              ]}
            />

            {(['light', 'dark', 'system'] as const).map((mode) => {
              const isActive = theme === mode;
              const Icon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Monitor;
              return (
                <TouchableOpacity
                  key={mode}
                  activeOpacity={1}
                  onPress={() => handleThemeChange(mode)}
                  className="flex-1 flex-row items-center justify-center py-3 z-10"
                >
                  <Icon size={18} color={isActive ? (isDark ? '#39FF14' : '#000000') : (isDark ? '#555' : '#999')} />
                  <Text className={`ml-2 font-inter-medium text-xs capitalize ${isActive ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-gray-500' : 'text-gray-400')}`}>
                    {mode}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Options */}
        <View className={`rounded-3xl mb-8 border overflow-hidden ${isDark ? 'bg-darkcard border-[#1A1A1A]' : 'bg-white border-gray-100 shadow-sm'}`}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === menuItems.length - 1;
            return (
              <TouchableOpacity 
                key={index} 
                onPress={() => {
                  if (item.label === 'Vehicle Pairing') {
                    router.push('/(tabs)/pairing');
                  }
                }}
                className={`py-4 px-5 flex-row items-center ${!isLast ? (isDark ? 'border-b border-darkcard' : 'border-b border-gray-100') : ''}`}
              >
                <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${isDark ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
                  <Icon size={20} color={isDark ? '#39FF14' : '#000000'} />
                </View>
                <Text className={`flex-1 font-inter-medium text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.label}</Text>
                <ChevronRight size={20} color={isDark ? '#555555' : '#D1D5DB'} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout */}
        <TouchableOpacity 
          onPress={handleLogout}
          className={`w-full py-4 rounded-full flex-row items-center justify-center mt-2 mb-24 border ${isDark ? 'bg-transparent border-darkcard' : 'bg-transparent border-red-100'}`}
        >
          <Text className={`font-inter-medium text-base ${isDark ? 'text-red-400' : 'text-red-500'}`}>
            Sign Out
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
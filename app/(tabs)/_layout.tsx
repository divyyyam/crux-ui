import React from 'react';
import { Tabs } from 'expo-router';
import { View, Platform, useColorScheme } from 'react-native';
import { Home, User, Sparkles } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 30 : 20,
          left: 40,
          right: 40,
          elevation: 0,
          backgroundColor: isDark ? '#111111' : '#ffffff',
          borderRadius: 30,
          height: 60,
          borderWidth: 1,
          borderColor: isDark ? '#333333' : '#e5e7eb',
          shadowColor: isDark ? '#000' : '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={`w-12 h-12 rounded-2xl items-center justify-center ${focused ? (isDark ? 'bg-gray-800' : 'bg-gray-100') : ''}`}>
              <Home size={24} color={focused ? (isDark ? '#39FF14' : '#000000') : '#6b7280'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ai-chatbot"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={`w-16 h-16 rounded-3xl items-center justify-center -mt-8 ${isDark ? 'bg-neon' : 'bg-black'} border-4 ${isDark ? 'border-darkbase' : 'border-gray-50'}`}>
              <Sparkles size={28} color={isDark ? '#000000' : '#ffffff'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={`w-12 h-12 rounded-2xl items-center justify-center ${focused ? (isDark ? 'bg-gray-800' : 'bg-gray-100') : ''}`}>
              <User size={24} color={focused ? (isDark ? '#39FF14' : '#000000') : '#6b7280'} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

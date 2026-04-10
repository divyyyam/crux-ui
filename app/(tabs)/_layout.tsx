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
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: isDark ? '#111111' : '#ffffff',
          borderRadius: 30,
          height: 64,
          paddingBottom: 0,
          borderWidth: 1,
          borderColor: isDark ? '#222222' : '#f3f4f6',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: isDark ? 0.5 : 0.05,
          shadowRadius: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={`w-12 h-12 rounded-full items-center justify-center ${focused ? (isDark ? 'bg-[#222222]' : 'bg-gray-100') : 'bg-transparent'}`}>
              <Home size={22} color={focused ? (isDark ? '#39FF14' : '#000000') : (isDark ? '#666666' : '#9ca3af')} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ai-chatbot"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={`w-14 h-14 rounded-full items-center justify-center -mt-6 border-4 ${isDark ? 'bg-[#39FF14] border-[#000000]' : 'bg-black border-white'} shadow-xl ${isDark ? 'shadow-neon/40' : 'shadow-black/20'}`}>
              <Sparkles size={24} color={isDark ? '#000000' : '#ffffff'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={`w-12 h-12 rounded-full items-center justify-center ${focused ? (isDark ? 'bg-[#222222]' : 'bg-gray-100') : 'bg-transparent'}`}>
              <User size={22} color={focused ? (isDark ? '#39FF14' : '#000000') : (isDark ? '#666666' : '#9ca3af')} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

import React from 'react';
import { Tabs } from 'expo-router';
import { View, Platform, useColorScheme } from 'react-native';
import { Home, User } from 'lucide-react-native';
import Svg, { Path, Circle } from 'react-native-svg';

// AI Sparkle icon — a four-pointed star with accent dots
function AISparkleIcon({ size = 26, color = 'white' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2 C12.5 6.5, 15 9, 22 12 C15 12.5, 12.5 15, 12 22 C11.5 15, 9 12.5, 2 12 C9 11.5, 11.5 6.5, 12 2 Z"
        fill={color}
      />
      <Circle cx="18.5" cy="5.5" r="1.5" fill={color} opacity={0.6} />
      <Circle cx="5.5" cy="18.5" r="1.5" fill={color} opacity={0.6} />
    </Svg>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#000000' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: isDark ? '#222222' : '#f4f4f5',
          height: Platform.OS === 'ios' ? 88 : 74,
          paddingTop: 12,
          paddingBottom: Platform.OS === 'ios' ? 24 : 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Home size={30} color={focused ? (isDark ? '#39FF14' : '#000000') : '#71717A'} />
          ),
        }}
      />
      <Tabs.Screen
        name="ai-chatbot"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={`w-14 h-14 rounded-full items-center justify-center -mt-2 ${focused ? (isDark ? 'bg-[#39FF14]' : 'bg-black') : (isDark ? 'bg-[#111111]' : 'bg-gray-100')}`}>
              <AISparkleIcon
                size={28}
                color={focused ? (isDark ? '#000000' : '#ffffff') : '#71717A'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <User size={30} color={focused ? (isDark ? '#39FF14' : '#000000') : '#71717A'} />
          ),
        }}
      />
    </Tabs>
  );
}
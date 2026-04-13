import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, useColorScheme, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';
import { ChevronRight, User as UserIcon, Bell, Shield, CircleHelp, Smartphone } from 'lucide-react-native';
import client from '../../src/api/client';

export default function SettingsScreen() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleLogout = async () => {
    try {
      // Call backend to invalidate token if applicable
      await client.post('/auth/logout');
    } catch (error) {
      console.log('Backend logout failed or not supported', error);
    } finally {
      // Always cleanup local store
      await logout();
      router.replace('/');
    }
  };

  const menuItems = [
    { icon: UserIcon, label: 'Account Profile' },
    { icon: Smartphone, label: 'Vehicle Pairing' },
    { icon: Bell, label: 'Notifications' },
    { icon: Shield, label: 'Privacy & Security' },
    { icon: CircleHelp, label: 'Help & Support' },
  ];

  const profileInitials = user?.name ? user.name.charAt(0).toUpperCase() : 'A';
  const profileName = user?.name || 'Alex Carter';
  const profileEmail = user?.email || 'alex.carter';

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-[#000000]' : 'bg-[#FAFAFA]'}`}>
      <ScrollView className="flex-1 px-6 pt-8">
        
        {/* Header */}
        <View className="mb-10">
          <Text className={`text-4xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Settings</Text>
          <Text className={`text-base font-inter mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Manage your account & preferences</Text>
        </View>

        {/* Premium Profile Card */}
        <View className={`p-5 rounded-3xl mb-10 flex-row items-center border ${isDark ? 'bg-[#111111] border-[#222222]' : 'bg-white border-gray-100 shadow-sm'}`}>
          <View className={`w-14 h-14 rounded-full mr-4 items-center justify-center ${isDark ? 'bg-[#2A2A2A]' : 'bg-gray-100'}`}>
            <Text className={`text-xl font-inter-semibold ${isDark ? 'text-neon' : 'text-black'}`}>{profileInitials}</Text>
          </View>
          <View className="flex-1">
            <Text className={`text-lg font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{profileName}</Text>
            <Text className={`text-sm font-inter ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-0.5`}>{profileEmail}</Text>
          </View>
          <TouchableOpacity className={`px-4 py-2 rounded-full ${isDark ? 'bg-[#2A2A2A]' : 'bg-gray-100'}`}>
            <Text className={`text-xs font-inter-medium ${isDark ? 'text-white' : 'text-black'}`}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Options */}
        <View className={`rounded-3xl mb-8 border overflow-hidden ${isDark ? 'bg-[#111111] border-[#222222]' : 'bg-white border-gray-100 shadow-sm'}`}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === menuItems.length - 1;
            return (
              <TouchableOpacity 
                key={index} 
                className={`py-4 px-5 flex-row items-center ${!isLast ? (isDark ? 'border-b border-[#222222]' : 'border-b border-gray-100') : ''}`}
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
          className={`w-full py-4 rounded-full flex-row items-center justify-center mt-2 mb-24 border ${isDark ? 'bg-transparent border-[#222222]' : 'bg-transparent border-red-100'}`}
        >
          <Text className={`font-inter-medium text-base ${isDark ? 'text-red-400' : 'text-red-500'}`}>
            Sign Out
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

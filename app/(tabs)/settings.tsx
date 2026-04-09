import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';

export default function SettingsScreen() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleLogout = () => {
    // Override actual auth logic for MVP, just navigate
    router.replace('/');
  };

  const sections = [
    { title: 'Account', items: ['Personal Information', 'Change Password', 'Privacy Settings'] },
    { title: 'Vehicle', items: ['Manage Connection', 'Diagnostic Preferences'] },
    { title: 'About', items: ['Help & Support', 'Terms of Service', 'App Version 1.0.0'] },
  ];

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkbase' : 'bg-white'}`}>
      <ScrollView className="flex-1 px-6 pt-6">
        
        {/* Header */}
        <View className="mb-8">
          <Text className={`text-3xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Settings</Text>
        </View>

        {/* Profile Card */}
        <View className={`p-6 rounded-3xl mb-8 flex-row items-center ${isDark ? 'bg-darkcard' : 'bg-gray-50'}`}>
          <View className={`w-16 h-16 rounded-full mr-4 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
          <View>
            <Text className={`text-xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>David Puttar</Text>
            <Text className={`font-inter ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Exodus50010</Text>
          </View>
        </View>

        {/* Options */}
        {sections.map((section, sIdx) => (
          <View key={sIdx} className="mb-8">
            <Text className={`text-sm font-inter-medium mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{section.title}</Text>
            <View className={`rounded-3xl overflow-hidden ${isDark ? 'bg-darkcard' : 'bg-gray-50'}`}>
              {section.items.map((item, iIdx) => (
                <TouchableOpacity 
                  key={iIdx} 
                  className={`p-4 flex-row justify-between items-center ${iIdx !== section.items.length - 1 ? (isDark ? 'border-b border-gray-800' : 'border-b border-gray-200') : ''}`}
                >
                  <Text className={`font-inter text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity 
          onPress={handleLogout}
          className={`w-full py-4 rounded-xl flex-row items-center justify-center mt-4 mb-24 ${isDark ? 'bg-gray-900/50 border border-gray-800' : 'bg-red-50 border border-red-100'}`}
        >
          <Text className={`font-inter-semibold text-lg ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            Log Out
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

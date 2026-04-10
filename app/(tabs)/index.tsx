import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, useColorScheme } from 'react-native';
import { useAuthStore } from '../../src/store/authStore';

export default function DashboardScreen() {
  const { height } = Dimensions.get('window');
  const size = height * 0.4;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkbase' : 'bg-white'}`}>
      <ScrollView className="flex-1 px-6 pt-6">
        
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6 pt-2">
          <View>
            <Text className={`text-3xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Hey Alex</Text>
            <Text className={`text-sm mt-1 font-inter ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Crux EV-100</Text>
          </View>
          <View className={`w-8 h-8 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
        </View>

        {/* Bike Placeholder Image */}
        <View style={{ height: size }} className="w-full relative mb-8 justify-center items-center">
          {/* We will add an image here later as requested by the user */}
          <View className={`absolute inset-0 rounded-3xl opacity-10 ${isDark ? 'bg-neon' : 'bg-gray-300'}`} />
        </View>

        {/* Stats Grid */}
        <View className="flex-row justify-between mb-4">
          <View className={`flex-1 p-4 rounded-2xl mr-2 ${isDark ? 'bg-darkcard' : 'bg-gray-100'}`}>
            <Text className={`text-sm font-inter mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Temperature</Text>
            <Text className={`text-3xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>32</Text>
          </View>
          <View className={`flex-1 p-4 rounded-2xl ml-2 ${isDark ? 'bg-darkcard' : 'bg-gray-100'}`}>
            <Text className={`text-sm font-inter mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>SOC</Text>
            <Text className={`text-3xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>10</Text>
          </View>
        </View>

        <View className={`w-full p-4 rounded-2xl mb-8 flex-row justify-between items-end ${isDark ? 'bg-darkcard' : 'bg-gray-100'}`}>
          <View>
            <Text className={`text-sm font-inter mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Battery</Text>
            <Text className={`text-4xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>32 %</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          className={`w-full py-4 rounded-xl flex-row items-center justify-center mb-24 ${isDark ? 'bg-neon' : 'bg-black'}`}
          activeOpacity={0.8}
        >
          <Text className={`font-inter-semibold text-lg ${isDark ? 'text-black' : 'text-white'}`}>
            Learn More
          </Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

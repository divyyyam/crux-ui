import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, useColorScheme } from 'react-native';
import { useAuthStore } from '../../src/store/authStore';
import { Image } from 'expo-image';

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

        {/* Bike Showcase */}
        <View style={{ height: size }} className="w-full relative mb-8 justify-center items-center">
          <View className={`absolute inset-0 rounded-3xl opacity-5 mt-4 mb-4 ${isDark ? 'bg-[#39FF14]' : 'bg-gray-300'}`} />
          <Image 
            source={require('../../assets/images/pngtree-electric-mountain-bike-with-fat-tires-and-modern-frame-png-image_20853368.png')} 
            style={{ width: '100%', height: '100%' }}
            contentFit="contain"
            transition={500}
          />
        </View>

        {/* Stats Grid - Row 1 */}
        <View className="flex-row justify-between mb-4">
          <View className={`flex-1 p-4 rounded-3xl mr-2 ${isDark ? 'bg-[#111] border border-[#222]' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <Text className={`text-xs font-inter-medium mb-2 uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Temp</Text>
            <Text className={`text-2xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>32°C</Text>
          </View>
          <View className={`flex-1 p-4 rounded-3xl mx-2 ${isDark ? 'bg-[#111] border border-[#222]' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <Text className={`text-xs font-inter-medium mb-2 uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>SOC</Text>
            <Text className={`text-2xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>85%</Text>
          </View>
          <View className={`flex-1 p-4 rounded-3xl ml-2 ${isDark ? 'bg-[#111] border border-[#222]' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <Text className={`text-xs font-inter-medium mb-2 uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Voltage</Text>
            <Text className={`text-2xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>398 V</Text>
          </View>
        </View>

        {/* Stats Grid - Row 2 */}
        <View className="flex-row justify-between mb-8">
          <View className={`flex-1 p-5 rounded-3xl mr-2 ${isDark ? 'bg-[#111] border border-[#222]' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <Text className={`text-sm font-inter-medium mb-2 uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current</Text>
            <Text className={`text-4xl font-inter-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>45 A</Text>
          </View>
          <View className={`flex-1 p-5 rounded-3xl ml-2 ${isDark ? 'bg-[#39FF14]/5 border border-[#39FF14]/20' : 'bg-green-50 border border-green-100 shadow-sm'}`}>
            <Text className={`text-sm font-inter-medium mb-2 uppercase tracking-wider ${isDark ? 'text-[#39FF14]' : 'text-green-700'}`}>Power</Text>
            <Text className={`text-4xl font-inter-semibold mt-1 ${isDark ? 'text-[#39FF14]' : 'text-green-800'}`}>18 kW</Text>
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

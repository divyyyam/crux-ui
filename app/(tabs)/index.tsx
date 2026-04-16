import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, useColorScheme } from 'react-native';
import { useAuthStore } from '../../src/store/authStore';
import { Image } from 'expo-image';
import client from '../../src/api/client';

export default function DashboardScreen() {
  const { height } = Dimensions.get('window');
  const size = height * 0.4;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const user = useAuthStore((state) => state.user);
  const [stats, setStats] = useState<{ temp: number; soc: number; voltage: number; current: number; power: number } | null>(null);
  
  const fetchDashboardData = async () => {
    try {
      const response = await client.get('/battery');
      if (response.data && response.data.success && response.data.data) {
        // Assuming the data is an array of latest readings for all devices, or an object with deviceIds as keys
        // We'll just grab the first available reading for the MVP
        const readings = response.data.data;
        const firstReading = Array.isArray(readings) ? readings[0] : Object.values(readings)[0];
        
        if (firstReading) {
          setStats({
            temp: firstReading.temperature || 0,
            soc: firstReading.soc || 0,
            voltage: firstReading.voltage || 0,
            current: firstReading.current || 0,
            power: (firstReading.power / 1000) || 0, // Assuming power is in Watts, display as kW
          });
        }
      }
    } catch (error) {
      console.log('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData(); // Initial fetch
    
    // Set up polling every 5 seconds
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const firstName = user?.name ? user.name.split(' ')[0] : 'User';
  const deviceName = user?.pairedDeviceName || 'Crux EV-100';

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkbase' : 'bg-white'}`}>
      <ScrollView className="flex-1 px-6 pt-6">
        
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6 pt-2">
          <View>
            <Text className={`text-3xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Hey {firstName}</Text>
            <Text className={`text-sm mt-1 font-inter ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{deviceName}</Text>
          </View>
          <View className={`w-8 h-8 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
        </View>

        {/* Bike Showcase */}
        <View style={{ height: size }} className="w-full relative mb-8 justify-center items-center">
          <View className={`absolute inset-0 rounded-3xl opacity-5 mt-4 mb-4 ${isDark ? 'bg-[#39D391]' : 'bg-gray-300'}`} />
          <Image 
            source={require('../../assets/images/pngtree-electric-mountain-bike-with-fat-tires-and-modern-frame-png-image_20853368.png')} 
            style={{ width: '100%', height: '100%' }}
            contentFit="contain"
            transition={500}
          />
        </View>

        {/* Stats Grid - Row 1 */}
        <View className="flex-row justify-between mb-4">
          <View className={`flex-1 p-4 rounded-3xl mr-2 ${isDark ? 'bg-darkcard border border-darkcard' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <Text className={`text-xs font-inter-medium mb-2 uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Temp</Text>
            <Text className={`text-2xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats ? `${stats.temp}°C` : '--'}</Text>
          </View>
          <View className={`flex-1 p-4 rounded-3xl mx-2 ${isDark ? 'bg-darkcard border border-darkcard' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <Text className={`text-xs font-inter-medium mb-2 uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>SOC</Text>
            <Text className={`text-2xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats ? `${stats.soc}%` : '--'}</Text>
          </View>
          <View className={`flex-1 p-4 rounded-3xl ml-2 ${isDark ? 'bg-darkcard border border-darkcard' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <Text className={`text-xs font-inter-medium mb-2 uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Voltage</Text>
            <Text className={`text-2xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats ? `${stats.voltage} V` : '--'}</Text>
          </View>
        </View>

        {/* Stats Grid - Row 2 */}
        <View className="flex-row justify-between mb-8">
          <View className={`flex-1 p-5 rounded-3xl mr-2 ${isDark ? 'bg-darkcard border border-darkcard' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <Text className={`text-sm font-inter-medium mb-2 uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current</Text>
            <Text className={`text-4xl font-inter-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats ? `${stats.current} A` : '--'}</Text>
          </View>
          <View className={`flex-1 p-5 rounded-3xl ml-2 ${isDark ? 'bg-[#39D391]/5 border border-[#39D391]/20' : 'bg-green-50 border border-green-100 shadow-sm'}`}>
            <Text className={`text-sm font-inter-medium mb-2 uppercase tracking-wider ${isDark ? 'text-[#39D391]' : 'text-green-700'}`}>Power</Text>
            <Text className={`text-4xl font-inter-semibold mt-1 ${isDark ? 'text-[#39D391]' : 'text-green-800'}`}>{stats ? `${stats.power.toFixed(1)} kW` : '--'}</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          className={`w-full py-4 rounded-xl flex-row items-center justify-center mb-24 ${isDark ? 'bg-neon' : 'bg-darkbase'}`}
          activeOpacity={0.8}
        >
          <Text className={`font-inter-semibold text-lg ${isDark ? 'text-darkbase' : 'text-white'}`}>
            Learn More
          </Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

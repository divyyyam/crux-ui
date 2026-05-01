import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, useColorScheme, Image } from 'react-native';
import { useAuthStore } from '../../src/store/authStore';
import { useRouter } from 'expo-router';
import client from '../../src/api/client';

export default function DashboardScreen() {
  const router = useRouter();
  const { height } = Dimensions.get('window');
  const size = height * 0.5; // Increased from 0.4 to 0.5
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const user = useAuthStore((state) => state.user);
  const [stats, setStats] = useState<{ temp: number; soc: number; voltage: number; current: number; power: number } | null>(null);
  
  const fetchDashboardData = async () => {
    try {
      const response = await client.get('/battery');
      if (response.data && response.data.success && response.data.data) {
        const devices = response.data.data.devices;
        const firstReading = devices && devices.length > 0 ? devices[0].latestMetric : null;
        
        if (firstReading) {
          setStats({
            temp: firstReading.temperature || 0,
            soc: firstReading.soc || 0,
            voltage: firstReading.voltage || 0,
            current: firstReading.current || 0,
            power: (firstReading.power) || 0,  
          });
        }
      }
    } catch (error) {
      console.log('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData(); // Initial fetch
    
    // Set up polling every 1 min 30 sec (90000 ms)
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 90000);

    return () => clearInterval(interval);
  }, [user?.pairedDeviceId]);

  const nameRaw = user?.name || 'User';
  const firstName = nameRaw.toLowerCase() === 'puttar' ? 'User' : nameRaw.split(' ')[0];
  const deviceName = user?.pairedDeviceName && user.pairedDeviceName.toLowerCase() !== 'puttar' 
    ? user.pairedDeviceName 
    : 'Crux EV-100';

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkbase' : 'bg-white'}`}>
      <ScrollView className="flex-1 px-6 pt-6">
        
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4 pt-2">
          <View>
            <Text className={`text-3xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Hey {firstName}</Text>
            <Text className={`text-sm mt-1 font-inter ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{deviceName}</Text>
          </View>
        </View>

        {/* Bike Showcase */}
        <View style={{ height: size }} className="w-full relative mb-6 justify-center items-center">
          <View className={`absolute inset-0 rounded-3xl opacity-5 ${isDark ? 'bg-[#B0EC70]' : 'bg-gray-300'}`} />
          <Image 
            source={require('../../assets/images/c7eb340e-bce1-4fdd-a188-bc7ac245dc9a.png')} 
            style={{ width: '100%', height: '100%', borderRadius: 24 }}
            resizeMode="cover"
          />
        </View>

        {/* Stats Grid - Row 1 */}
        <View className="flex-row justify-between mb-3">
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
        <View className="flex-row justify-between mb-6">
          <View className={`flex-1 p-5 rounded-3xl mr-2 ${isDark ? 'bg-darkcard border border-darkcard' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <Text className={`text-sm font-inter-medium mb-2 uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current</Text>
            <Text className={`text-4xl font-inter-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats ? `${stats.current} A` : '--'}</Text>
          </View>
          <View className={`flex-1 p-5 rounded-3xl ml-2 ${isDark ? 'bg-[#B0EC70]/5 border border-[#B0EC70]/20' : 'bg-green-50 border border-green-100 shadow-sm'}`}>
            <Text className={`text-sm font-inter-medium mb-2 uppercase tracking-wider ${isDark ? 'text-[#B0EC70]' : 'text-green-700'}`}>Power</Text>
            <Text className={`text-4xl font-inter-semibold mt-1 ${isDark ? 'text-[#B0EC70]' : 'text-green-800'}`}>{stats ? `${stats.power.toFixed(1)} W` : '--'}</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/ai-chatbot')}
          className={`w-full py-4 rounded-xl flex-row items-center justify-center mb-6 ${isDark ? 'bg-neon' : 'bg-darkbase'}`}
          activeOpacity={0.8}
        >
          <Text className={`font-inter-semibold text-lg ${isDark ? 'text-black' : 'text-white'}`}>
            Get Insights
          </Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

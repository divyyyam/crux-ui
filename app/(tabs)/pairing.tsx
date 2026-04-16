import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, useColorScheme, Alert, ActivityIndicator } from 'react-native';
import { Cpu, CheckCircle2, AlertCircle } from 'lucide-react-native';
import client from '../../src/api/client';
import { useAuthStore } from '../../src/store/authStore';

export default function PairingScreen() {
  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handlePairing = async () => {
    if (!deviceId.trim()) {
      Alert.alert('Error', 'Please enter a valid Device ID.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await client.post('/devices/pair', { deviceId: deviceId.trim() });

      if (response.data && response.data.success) {
        // Update user state with the new device information if available
        // The backend returns { success: true, message: "...", data: { deviceId, isPaired } }
        if (user) {
          setUser({
            ...user,
            pairedDeviceId: response.data.data.deviceId,
            pairedDeviceName: response.data.data.deviceName || 'Crux EV-100', // Default if not returned
          });
        }
        
        Alert.alert('Success', 'Device paired successfully!');
        setDeviceId('');
      } else {
        Alert.alert('Pairing Failed', response.data?.message || 'Could not pair device.');
      }
    } catch (error: any) {
      console.error('Pairing error:', error);
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please check the Device ID and try again.';
      Alert.alert('Pairing Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnpair = async () => {
    if (!user?.pairedDeviceId) return;
    
    setIsLoading(true);
    try {
      const response = await client.delete(`/devices/${user.pairedDeviceId}`);
      if (response.data && response.data.success) {
        setUser({
          ...user,
          pairedDeviceId: null,
          pairedDeviceName: null,
        });
        Alert.alert('Success', 'Device unpaired successfully!');
      } else {
        Alert.alert('Unpair Failed', response.data?.message || 'Could not unpair device.');
      }
    } catch (error: any) {
      console.error('Unpairing error:', error);
      Alert.alert('Unpair Error', error.response?.data?.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.pairedDeviceId) {
    return (
      <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkbase' : 'bg-white'}`}>
        <View className="flex-1 px-6 pt-12">
          <View className="items-center mb-12">
            <View className={`w-20 h-20 rounded-full items-center justify-center mb-6 ${isDark ? 'bg-darkcard border border-darkcard' : 'bg-[#39FF14]/10 border border-[#39FF14]/20'}`}>
              <CheckCircle2 size={40} color={isDark ? '#39FF14' : '#16a34a'} />
            </View>
            <Text className={`text-3xl font-inter-semibold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.pairedDeviceName && user.pairedDeviceName.toLowerCase() !== 'puttar' ? user.pairedDeviceName : 'Active Vehicle'}</Text>
            <Text className={`text-sm mt-3 font-inter leading-relaxed text-center px-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Your Crux hardware module is securely connected.
            </Text>
          </View>

          <View className={`border rounded-2xl p-6 items-center ${isDark ? 'border-gray-800 bg-darkcard' : 'border-gray-200 bg-gray-50'}`}>
            <Cpu size={32} color={isDark ? '#fff' : '#000'} style={{ marginBottom: 16 }} />
            <Text className={`text-xs font-inter-medium uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Hardware ID</Text>
            <Text className={`text-xl font-inter-semibold mt-2 tracking-widest ${isDark ? 'text-[#39FF14]' : 'text-green-600'}`}>{user.pairedDeviceId}</Text>
          </View>

          <View className="mt-auto mb-10">
            <TouchableOpacity 
              onPress={handleUnpair}
              disabled={isLoading}
              className={`w-full py-5 rounded-xl flex-row items-center justify-center border ${isDark ? 'border-darkcard bg-transparent' : 'border-red-100 bg-transparent'} ${isLoading ? 'opacity-70' : ''}`}
            >
              {isLoading ? (
                <ActivityIndicator color={isDark ? '#ff4444' : '#ef4444'} />
              ) : (
                <Text className={`font-inter-semibold text-lg ${isDark ? 'text-red-400' : 'text-red-500'}`}>
                  Unlink Vehicle
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkbase' : 'bg-white'}`}>
      <View className="flex-1 px-6 pt-12">
        {/* Header Section */}
        <View className="items-center mb-12">
          <View className={`w-20 h-20 rounded-full items-center justify-center mb-6 ${isDark ? 'bg-darkcard border border-darkcard' : 'bg-gray-100 border border-gray-200'}`}>
            <Cpu size={40} color={isDark ? '#39FF14' : '#000000'} />
          </View>
          <Text className={`text-3xl font-inter-semibold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Pair Device</Text>
          <Text className={`text-sm mt-3 font-inter leading-relaxed text-center px-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Enter the unique ID printed on your Crux hardware module to begin tracking your battery health.
          </Text>
        </View>

        {/* Input Section */}
        <View className="space-y-6">
          <View>
            <Text className={`text-xs font-inter-medium mb-2 uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Hardware ID</Text>
            <View className={`border rounded-xl px-5 py-5 ${isDark ? 'border-gray-800 bg-darkcard' : 'border-gray-200 bg-gray-50'}`}>
              <TextInput
                placeholder="e.g. CRX-8821-V4"
                placeholderTextColor={isDark ? '#4b5563' : '#9ca3af'}
                value={deviceId}
                onChangeText={setDeviceId}
                className={`font-inter text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}
                autoCapitalize="characters"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Status Indicator (Optional Visual) */}
          <View className={`flex-row items-center p-4 rounded-xl mt-4 ${isDark ? 'bg-darkcard/50' : 'bg-gray-50'}`}>
            <View className={`w-2 h-2 rounded-full mr-3 ${isLoading ? 'bg-yellow-500' : (deviceId ? 'bg-neon' : 'bg-gray-600')}`} />
            <Text className={`text-xs font-inter ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {isLoading ? 'Connecting to Crux cloud...' : (deviceId ? 'Ready to pair' : 'Waiting for ID input')}
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <View className="mt-auto mb-10">
          <TouchableOpacity 
            onPress={handlePairing}
            disabled={isLoading}
            className={`w-full py-5 rounded-xl flex-row items-center justify-center ${isDark ? 'bg-neon' : 'bg-darkbase'} ${isLoading ? 'opacity-70' : ''}`}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={isDark ? '#000000' : '#ffffff'} />
            ) : (
              <Text className={`font-inter-semibold text-lg ${isDark ? 'text-darkbase' : 'text-white'}`}>
                Link Device
              </Text>
            )}
          </TouchableOpacity>
          
          <Text className={`text-center text-xs mt-4 font-inter ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            Secure End-to-End Encryption Enabled
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

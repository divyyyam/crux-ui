import React from 'react';
import { View, Text, SafeAreaView, useColorScheme, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Shield } from 'lucide-react-native';

export default function PrivacyScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkbase' : 'bg-white'}`}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Custom Header */}
      <View className={`px-6 pt-4 pb-4 border-b flex-row items-center ${isDark ? 'border-darkcard' : 'border-gray-100'}`}>
        <TouchableOpacity onPress={() => router.back()} className={`w-10 h-10 rounded-full items-center justify-center -ml-2 mr-2 ${isDark ? 'bg-darkcard' : 'bg-gray-100'}`}>
          <ArrowLeft size={20} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text className={`text-xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Privacy & Security</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-8">
        <View className="items-center mb-8 mt-4">
          <View className={`w-20 h-20 rounded-full items-center justify-center mb-6 ${isDark ? 'bg-[#39FF14]/10' : 'bg-green-100'}`}>
            <Shield size={40} color={isDark ? '#39FF14' : '#16a34a'} />
          </View>
          <Text className={`text-2xl font-inter-semibold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Data is Secure</Text>
          <Text className={`text-sm mt-3 font-inter leading-relaxed text-center px-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            All telemetry data sent to the Crux AI Diagnostics engine is end-to-end encrypted. We do not sell or share your vehicle's usage patterns with third parties.
          </Text>
        </View>
        
        <View className={`p-6 rounded-2xl border ${isDark ? 'bg-darkcard border-darkcard' : 'bg-gray-50 border-gray-200'} mb-10`}>
          <Text className={`text-base font-inter-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Data Retention</Text>
          <Text className={`font-inter text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Diagnostic logs are retained for 30 days to train the AI assistant exclusively for your profile.</Text>
          
          <Text className={`text-base font-inter-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Account Deletion</Text>
          <Text className={`font-inter text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>You can permanently delete your account and all associated telemetry records at any time.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

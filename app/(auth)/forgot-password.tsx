import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, useColorScheme, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail } from 'lucide-react-native';
import client from '../../src/api/client';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleRequestReset = async () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await client.post('/auth/forgot-password', { email });
      
      if (response.data && response.data.success) {
        Alert.alert('Link Sent!', 'If that email exists in our system, you will receive a 6-digit verification code shortly.');
        router.push('/(auth)/reset-password');
      } else {
        Alert.alert('Failed', response.data?.message || 'Could not process request.');
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={`flex-1 ${isDark ? 'bg-darkbase' : 'bg-white'}`}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-16">
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} className="mb-8">
          <ArrowLeft size={28} color={isDark ? '#ffffff' : '#000000'} />
        </TouchableOpacity>

        {/* Header Section */}
        <View className="mb-10 items-center">
          <View className={`w-20 h-20 rounded-full items-center justify-center mb-6 ${isDark ? 'bg-darkcard border border-darkcard' : 'bg-gray-100 border border-gray-200'}`}>
            <Mail size={40} color={isDark ? '#B0EC70' : '#000000'} />
          </View>
          <Text className={`text-3xl font-inter-semibold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Reset Password</Text>
          <Text className={`text-sm mt-3 font-inter leading-relaxed text-center px-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Enter the email address associated with your Crux account. We will send you a 6-digit recovery code.
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-6 flex-1">
          <View>
            <Text className={`text-sm font-inter-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Account E-Mail</Text>
            <View className={`border rounded-xl px-4 py-4 ${isDark ? 'border-gray-800 bg-darkcard' : 'border-gray-200 bg-gray-50'}`}>
              <TextInput
                placeholder="email@example.com"
                placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                value={email}
                onChangeText={setEmail}
                className={`font-inter text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="mt-auto mb-12">
          <TouchableOpacity 
            onPress={handleRequestReset}
            disabled={isLoading}
            className={`w-full py-4 rounded-xl flex-row items-center justify-center ${isDark ? 'bg-neon' : 'bg-darkbase'} ${isLoading ? 'opacity-70' : ''}`}
            activeOpacity={0.8}
          >
            <Text className={`font-inter-semibold text-lg ${isDark ? 'text-black' : 'text-white'}`}>
              {isLoading ? 'Sending...' : 'Send Recovery Code'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

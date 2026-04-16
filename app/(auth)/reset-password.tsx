import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, useColorScheme, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, KeyRound, Eye, EyeOff } from 'lucide-react-native';
import client from '../../src/api/client';

export default function ResetPasswordScreen() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleResetPassword = async () => {
    if (!token || !password) {
      Alert.alert('Error', 'Please enter both the 6-digit recovery code and a new password.');
      return;
    }
    
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await client.post('/auth/reset-password', { token, password });
      
      if (response.data && response.data.success) {
        Alert.alert('Success', 'Your password has been reset successfully. Please login with your new password.');
        router.push('/(auth)/login');
      } else {
        Alert.alert('Reset Failed', response.data?.message || 'Could not reset password.');
      }
    } catch (error: any) {
      console.error('Reset password error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Invalid or expired recovery code. Please request a new one.');
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
            <KeyRound size={40} color={isDark ? '#B0EC70' : '#000000'} />
          </View>
          <Text className={`text-3xl font-inter-semibold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Finalize Reset</Text>
          <Text className={`text-sm mt-3 font-inter leading-relaxed text-center px-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Enter the 6-digit code we emailed to you and input your new secure password below to finalize the changes.
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-6 flex-1">
          <View>
            <Text className={`text-sm font-inter-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>6-Digit Recovery Code</Text>
            <View className={`border rounded-xl px-4 py-4 ${isDark ? 'border-gray-800 bg-darkcard' : 'border-gray-200 bg-gray-50'}`}>
              <TextInput
                placeholder="e.g. 529188"
                placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                value={token}
                onChangeText={setToken}
                className={`font-inter text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>
          </View>

          <View className="mt-4">
            <Text className={`text-sm font-inter-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>New Password</Text>
            <View className={`border rounded-xl px-4 py-4 flex-row items-center justify-between ${isDark ? 'border-gray-800 bg-darkcard' : 'border-gray-200 bg-gray-50'}`}>
              <TextInput
                placeholder="••••••••••••"
                placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className={`font-inter text-base flex-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="ml-2">
                {showPassword ? (
                  <EyeOff size={20} color={isDark ? '#6b7280' : '#9ca3af'} />
                ) : (
                  <Eye size={20} color={isDark ? '#6b7280' : '#9ca3af'} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="mt-auto mb-12">
          <TouchableOpacity 
            onPress={handleResetPassword}
            disabled={isLoading}
            className={`w-full py-4 rounded-xl flex-row items-center justify-center ${isDark ? 'bg-neon' : 'bg-darkbase'} ${isLoading ? 'opacity-70' : ''}`}
            activeOpacity={0.8}
          >
            <Text className={`font-inter-semibold text-lg ${isDark ? 'text-black' : 'text-white'}`}>
              {isLoading ? 'Resetting...' : 'Change Password'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

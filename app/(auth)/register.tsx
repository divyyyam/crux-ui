import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, useColorScheme, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { useAuthStore } from '../../src/store/authStore';
import client from '../../src/api/client';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const setTokens = useAuthStore((state) => state.setTokens);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await client.post('/auth/signup', { name: username, email, password });
      
      if (response.data && response.data.success) {
        const { user: basicUser, accessToken, refreshToken } = response.data.data;
        await setTokens(accessToken, refreshToken);
        
        try {
          const meResponse = await client.get('/auth/me');
          if (meResponse.data && meResponse.data.success) {
            setUser(meResponse.data.data.user || meResponse.data.data);
          } else {
            setUser(basicUser);
          }
        } catch (err) {
          console.warn("Failed to fetch full profile after register, falling back to basic user", err);
          setUser(basicUser);
        }
        
        router.replace('/(tabs)');
      } else {
        Alert.alert('Registration Failed', response.data?.message || 'Something went wrong');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      Alert.alert('Registration Error', error.response?.data?.message || 'Something went wrong. Please try again.');
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

        {/* Header */}
        <View className="mb-10">
          <Text className={`text-3xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome Back</Text>
          <Text className={`text-sm mt-2 font-inter leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Crux Makes EV Battery Health{'\n'}Simple And Transparent
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-6 flex-1">
          <View>
            <Text className={`text-sm font-inter-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Username</Text>
            <View className={`border rounded-xl px-4 py-4 ${isDark ? 'border-gray-800 bg-darkcard' : 'border-gray-200 bg-gray-50'}`}>
              <TextInput
                placeholder="alex.carter"
                placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                value={username}
                onChangeText={setUsername}
                className={`font-inter text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
              />
            </View>
          </View>

          <View className="mt-4">
            <Text className={`text-sm font-inter-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>E-Mail</Text>
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

          <View className="mt-4">
            <Text className={`text-sm font-inter-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Password</Text>
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

        {/* Actions - Pushed to bottom */}
        <View className="mt-auto mb-8 pt-4">
          <TouchableOpacity 
            onPress={handleRegister}
            disabled={isLoading}
            className={`w-full py-4 rounded-xl flex-row items-center justify-center ${isDark ? 'bg-neon' : 'bg-black'} ${isLoading ? 'opacity-70' : ''}`}
            activeOpacity={0.8}
          >
            <Text className={`font-inter-semibold text-lg ${isDark ? 'text-black' : 'text-white'}`}>
              {isLoading ? 'Loading...' : 'Signup'}
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text className={`font-inter ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Already Have An Account?{' '}
            </Text>
            <Link href="/(auth)/login">
              <Text className={`font-inter-semibold ${isDark ? 'text-neon' : 'text-black'}`}>
                Login
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

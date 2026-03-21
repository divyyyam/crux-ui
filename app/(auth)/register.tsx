import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { UserPlus, Mail, Lock, User, Eye, EyeOff } from 'lucide-react-native';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleRegister = async () => {
    setIsLoading(true);
    // Mock registration logic
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/login');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-20">
        <View className="mb-10 items-center">
          <View className="w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center mb-4">
            <UserPlus color="white" size={32} />
          </View>
          <Text className="text-3xl font-bold text-gray-900">Create Account</Text>
          <Text className="text-gray-500 mt-2">Join Crux and start managing</Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">Full Name</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
              <User size={20} color="#6b7280" />
              <TextInput
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                className="flex-1 ml-3 text-gray-900 text-base"
              />
            </View>
          </View>

          <View className="mt-4">
            <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
              <Mail size={20} color="#6b7280" />
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                className="flex-1 ml-3 text-gray-900 text-base"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View className="mt-4">
            <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">Password</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
              <Lock size={20} color="#6b7280" />
              <TextInput
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="flex-1 ml-3 text-gray-900 text-base"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} color="#6b7280" /> : <Eye size={20} color="#6b7280" />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            onPress={handleRegister}
            disabled={isLoading}
            className={`w-full py-4 rounded-xl mt-8 flex-row items-center justify-center ${isLoading ? 'bg-blue-400' : 'bg-blue-600'}`}
          >
            <Text className="text-white font-bold text-lg mr-2">{isLoading ? 'Creating Account...' : 'Register'}</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-10 mb-10">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/login">
            <Text className="text-blue-600 font-bold">Sign In</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

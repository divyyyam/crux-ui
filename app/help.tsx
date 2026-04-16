import React from 'react';
import { View, Text, SafeAreaView, useColorScheme, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, CircleHelp, Mail, ExternalLink } from 'lucide-react-native';

export default function HelpScreen() {
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
        <Text className={`text-xl font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Help & Support</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-8">
        <View className="items-center mb-10 mt-2">
          <View className={`w-20 h-20 rounded-full items-center justify-center mb-6 ${isDark ? 'bg-darkcard border border-darkcard' : 'bg-gray-100 border border-gray-200'}`}>
            <CircleHelp size={40} color={isDark ? '#B0EC70' : '#000000'} />
          </View>
          <Text className={`text-2xl font-inter-semibold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>How can we help?</Text>
          <Text className={`text-sm mt-3 font-inter leading-relaxed text-center px-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Having trouble with your Crux EV hardware or the AI chatbot? Get in touch with our team.
          </Text>
        </View>

        {/* Contact Support */}
        <TouchableOpacity 
          className={`p-5 rounded-2xl mb-4 flex-row items-center border ${isDark ? 'bg-darkcard border-darkcard' : 'bg-white border-gray-100 shadow-sm'}`}
        >
          <View className={`w-12 h-12 rounded-full mr-4 items-center justify-center ${isDark ? 'bg-[#1A1A1A]' : 'bg-gray-100'}`}>
             <Mail size={20} color={isDark ? '#fff' : '#000'} />
          </View>
          <View className="flex-1">
            <Text className={`text-base font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Email Support</Text>
            <Text className={`text-sm font-inter ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-0.5`}>support@crux.co</Text>
          </View>
        </TouchableOpacity>

        {/* Knowledge Base */}
        <TouchableOpacity 
          className={`p-5 rounded-2xl mb-4 flex-row items-center border ${isDark ? 'bg-darkcard border-darkcard' : 'bg-white border-gray-100 shadow-sm'}`}
        >
          <View className={`w-12 h-12 rounded-full mr-4 items-center justify-center ${isDark ? 'bg-[#1A1A1A]' : 'bg-gray-100'}`}>
             <ExternalLink size={20} color={isDark ? '#fff' : '#000'} />
          </View>
          <View className="flex-1">
            <Text className={`text-base font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Knowledge Base</Text>
            <Text className={`text-sm font-inter ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-0.5`}>Hardware manuals & FAQs</Text>
          </View>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

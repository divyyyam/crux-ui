import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, useColorScheme, Platform, KeyboardAvoidingView } from 'react-native';
import { Send, Sparkles } from 'lucide-react-native';

export default function AiChatbotScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkbase' : 'bg-[#FAFAFA]'}`}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <View className={`px-6 py-4 border-b ${isDark ? 'border-darkcard' : 'border-gray-100'} flex-row items-center border-t-0`}>
          <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${isDark ? 'bg-darkcard' : 'bg-gray-100'}`}>
            <Sparkles size={18} color={isDark ? '#39FF14' : '#000000'} />
          </View>
          <View>
            <Text className={`text-lg font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Crux AI</Text>
            <Text className={`text-xs font-inter-medium ${isDark ? 'text-[#39FF14]' : 'text-green-600'}`}>Online</Text>
          </View>
        </View>

        {/* Chat Area */}
        <ScrollView className="flex-1 px-4 pt-6">
          
          {/* User Message */}
          <View className="flex-row justify-end mb-6">
            <View className={`max-w-[80%] rounded-3xl rounded-tr-sm px-5 py-4 ${isDark ? 'bg-darkcard' : 'bg-gray-200'}`}>
              <Text className={`font-inter text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                How can I keep my EV-100 in top shape? My SOC is at 85% right now.
              </Text>
              <Text className={`text-[10px] mt-2 text-right font-inter ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>10:24 AM</Text>
            </View>
          </View>

          {/* AI Message */}
          <View className="flex-row justify-start mb-6">
            <View className={`w-8 h-8 rounded-full items-center justify-center mr-2 mt-1 ${isDark ? 'bg-darkcard' : 'bg-gray-100'}`}>
              <Sparkles size={14} color={isDark ? '#39FF14' : '#000000'} />
            </View>
            <View className={`max-w-[80%] rounded-3xl rounded-tl-sm px-5 py-4 ${isDark ? 'bg-darkcard border border-darkcard' : 'bg-white border border-gray-100 shadow-sm'}`}>
              <Text className={`font-inter text-base leading-relaxed ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Hey Alex! Since your current SOC is well-managed at 85% and the operating temperature is optimal, your Crux EV-100 is in excellent health!
              </Text>
              <View className="mt-3 space-y-2">
                <Text className={`font-inter text-[15px] leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  • <Text className={`font-inter-semibold ${isDark ? 'text-white' : 'text-black'}`}>Charge Range:</Text> Limit typical daily charging to 80% to preserve cell longevity.
                </Text>
                <Text className={`font-inter text-[15px] leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  • <Text className={`font-inter-semibold ${isDark ? 'text-white' : 'text-black'}`}>Temperature:</Text> The battery is comfortable at exactly 32°C now. If parked in freezing conditions, keep it plugged in.
                </Text>
              </View>
              <Text className={`font-inter mt-4 text-[15px] leading-relaxed ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Would you like me to run a full diagnostic scan on the powertrain?
              </Text>
              <Text className={`text-[10px] mt-2 font-inter ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>10:25 AM</Text>
            </View>
          </View>

        </ScrollView>

        {/* Input Area */}
        <View className={`px-4 pt-4 pb-4 border-t ${isDark ? 'bg-darkbase border-darkcard' : 'bg-[#FAFAFA] border-gray-100'}`}>
          <View className={`flex-row items-center px-2 py-1 rounded-full border ${isDark ? 'bg-darkcard border-darkcard' : 'bg-white border-gray-200'}`}>
            <TextInput 
              placeholder="Message Crux AI..."
              placeholderTextColor={isDark ? '#666666' : '#999999'}
              className={`flex-1 px-4 py-3 font-inter text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
              multiline
            />
            <TouchableOpacity className={`w-10 h-10 rounded-full items-center justify-center mr-1 ${isDark ? 'bg-neon' : 'bg-darkbase'}`}>
              <Send size={18} color={isDark ? '#000000' : '#ffffff'} style={{ marginLeft: -2 }} />
            </TouchableOpacity>
          </View>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

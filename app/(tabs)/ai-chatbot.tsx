import React from 'react';
import { View, Text, SafeAreaView, useColorScheme } from 'react-native';

export default function AiChatbotScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkbase' : 'bg-white'}`}>
      <View className="flex-1 justify-center items-center px-6">
        <View className={`w-24 h-24 rounded-3xl mb-8 items-center justify-center opacity-20 ${isDark ? 'bg-neon' : 'bg-gray-300'}`} />
        <Text className={`text-3xl font-inter-semibold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Crux AI Assistant
        </Text>
        <Text className={`text-center font-inter ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Coming soon. Get ready to interact with your EV's intelligent diagnostic assistant.
        </Text>
      </View>
    </SafeAreaView>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, useColorScheme } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Image } from 'expo-image';

export default function OnboardingScreen() {
  const router = useRouter();
  const { height } = Dimensions.get('window');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkbase' : 'bg-white'}`}>
      <View className="flex-1 px-6 justify-between pt-10 pb-8">
        
        {/* Top Spacer for Image placeholder later */}
        <View style={{ height: height * 0.4 }} className="w-full relative rounded-3xl overflow-hidden mt-4">
          <Image 
            source={require('../assets/images/WhatsApp Image 2026-04-16 at 23.23.27.jpeg')} 
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={500}
          />
          <View className={`absolute inset-0 opacity-20 ${isDark ? 'bg-neon' : 'bg-transparent'}`} />
        </View>

        {/* Content Area */}
        <View className="flex-1 mt-8">
          <Text className={`text-4xl font-inter-semibold leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
            Track Your {'\n'}Ev's Battery {'\n'}Life Effortlessly
          </Text>
          <Text className={`text-sm mt-4 font-inter leading-relaxed pr-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Crux Makes EV Battery Health{'\n'}Simple And Transparent
          </Text>
        </View>

        {/* Actions */}
        <View className="w-full mt-auto">
          <TouchableOpacity 
            onPress={() => router.push('/(auth)/register')}
            className={`w-full py-4 rounded-xl flex-row items-center justify-center ${isDark ? 'bg-neon' : 'bg-darkbase'}`}
            activeOpacity={0.8}
          >
            <Text className={`font-inter-semibold text-lg ${isDark ? 'text-black' : 'text-white'}`}>
              Get Started
            </Text>
          </TouchableOpacity>
          
          <View className="flex-row justify-center mt-6">
            <Text className={`font-inter ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Already Have An Account?{' '}
            </Text>
            <Link href="/(auth)/login">
              <Text className={`font-inter-semibold ${isDark ? 'text-neon' : 'text-darkbase'}`}>
                Login
              </Text>
            </Link>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

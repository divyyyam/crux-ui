import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, useColorScheme, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();
  const { height } = Dimensions.get('window');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkbase' : 'bg-white'}`}>
      <View className="flex-1 px-6 justify-between pt-10 pb-8">
        
        {/* Top Spacer for Image */}
        <View style={{ height: height * 0.4 }} className="w-full relative rounded-3xl overflow-hidden mt-4">
          <Image 
            source={require('../assets/images/f77f3e73-862e-4693-a3d2-0962c8362679.png')} 
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
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

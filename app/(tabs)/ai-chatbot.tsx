import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, useColorScheme, ActivityIndicator } from 'react-native';
import { Sparkles, RefreshCw } from 'lucide-react-native';
import { useAuthStore } from '../../src/store/authStore';
import client from '../../src/api/client';

export default function AiChatbotScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const user = useAuthStore((state) => state.user);
  
  const [report, setReport] = useState<{insight: { recommendation: string, averageTemperature?: number, averageVoltage?: number } | any, telemetrySummary?: any, generatedAt?: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchReport = async () => {
    if (!user?.pairedDeviceId) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await client.get(`/battery/${user.pairedDeviceId}/health-insight`);
      if (response.data && response.data.success) {
        setReport(response.data.data);
      } else {
        setError(response.data?.message || 'Failed to generate insight.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Could not connect to Crux AI or no data available.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.pairedDeviceId && !report && !isLoading) {
      fetchReport();
    }
  }, [user?.pairedDeviceId]);

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkbase' : 'bg-[#FAFAFA]'}`}>
      {/* Header */}
      <View className={`px-6 pt-12 pb-3 border-b ${isDark ? 'border-darkcard' : 'border-gray-100'} flex-row items-center border-t-0`}>
        <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${isDark ? 'bg-darkcard' : 'bg-gray-100'}`}>
          <Sparkles size={16} color={isDark ? '#39FF14' : '#000000'} />
        </View>
        <View className="flex-1">
          <Text className={`text-lg font-inter-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Crux AI Auto-Diagnostics</Text>
          <Text className={`text-xs font-inter-medium ${isDark ? 'text-[#39FF14]' : 'text-green-600'}`}>Real-time Insight Engine</Text>
        </View>
        <TouchableOpacity 
          onPress={fetchReport} 
          disabled={isLoading || !user?.pairedDeviceId}
          className={`w-10 h-10 rounded-full items-center justify-center ${isDark ? 'bg-darkcard' : 'bg-gray-100'}`}
        >
          {isLoading ? (
             <ActivityIndicator size="small" color={isDark ? '#39FF14' : '#000000'} />
          ) : (
             <RefreshCw size={16} color={isDark ? '#ffffff' : '#000000'} />
          )}
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <ScrollView className="flex-1 px-4 pt-6 pb-12">

        {!user?.pairedDeviceId ? (
          <View className={`p-6 rounded-3xl mt-4 mx-2 items-center ${isDark ? 'bg-darkcard' : 'bg-gray-100'}`}>
            <Text className={`font-inter text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Please pair a device from the Vehicle Pairing menu to receive AI battery insights.
            </Text>
          </View>
        ) : (
          <View className="flex-row justify-start mb-10 w-full pr-4">
            <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 mt-1 ${isDark ? 'bg-darkcard' : 'bg-gray-100'}`}>
              <Sparkles size={12} color={isDark ? '#39FF14' : '#000000'} />
            </View>
            
            <View className={`flex-1 rounded-3xl rounded-tl-sm px-5 py-5 ${isDark ? 'bg-darkcard border border-darkcard' : 'bg-white border border-gray-100 shadow-sm'}`}>
              
              {isLoading && !report && (
                <Text className={`font-inter text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Analyzing telemetry data and generating insight report...
                </Text>
              )}

              {error ? (
                <Text className={`font-inter text-base text-red-400`}>
                  {error}
                </Text>
              ) : null}

              {!isLoading && report && (
                <View>
                  <Text className={`font-inter text-base leading-relaxed ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {typeof report.insight === 'object' && report.insight !== null && report.insight.recommendation ? report.insight.recommendation : JSON.stringify(report.insight)}
                  </Text>
                  
                  {report.telemetrySummary && (
                    <View className={`mt-5 pt-4 border-t ${isDark ? 'border-[#39FF14]/20' : 'border-gray-200'}`}>
                      <Text className={`text-xs uppercase tracking-widest font-inter-semibold mb-3 ${isDark ? 'text-[#39FF14]' : 'text-green-700'}`}>
                        Recent Telemetry Summary
                      </Text>
                      {Object.keys(report.telemetrySummary).map((key) => (
                        <View key={key} className="flex-row justify-between py-1.5">
                           <Text className={`font-inter capitalize ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{key}</Text>
                           <Text className={`font-inter-medium flex-1 text-right ml-4 ${isDark ? 'text-white' : 'text-black'}`}>
                             {typeof report.telemetrySummary[key] === 'object' && report.telemetrySummary[key] !== null 
                               ? JSON.stringify(report.telemetrySummary[key]) 
                               : String(report.telemetrySummary[key] ?? '')}
                           </Text>
                        </View>
                      ))}
                    </View>
                  )}
                  <Text className={`text-[10px] mt-4 font-inter text-right ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Generated {report.generatedAt ? new Date(report.generatedAt).toLocaleTimeString() : new Date().toLocaleTimeString()}
                  </Text>
                </View>
              )}

            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

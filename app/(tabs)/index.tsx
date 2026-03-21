import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuthStore } from '../../src/store/authStore';
import { LayoutDashboard, TrendingUp, Users, Settings, LogOut, Bell } from 'lucide-react-native';

export default function DashboardScreen() {
  const logout = useAuthStore((state) => state.logout);

  const stats = [
    { label: 'Total Sales', value: '$12,450', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Active Users', value: '1,240', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
        <View>
          <Text className="text-gray-500 text-sm">Welcome back,</Text>
          <Text className="text-xl font-bold text-gray-900">Admin Dashboard</Text>
        </View>
        <TouchableOpacity className="p-2 bg-gray-100 rounded-full">
          <Bell size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView className="px-6 pt-6">
        <View className="flex-row justify-between space-x-4 mb-6">
          {stats.map((stat, index) => (
            <View key={index} className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <View className={`${stat.bg} w-10 h-10 rounded-xl items-center justify-center mb-3`}>
                <stat.icon size={20} className={stat.color} />
              </View>
              <Text className="text-gray-500 text-xs mb-1">{stat.label}</Text>
              <Text className="text-lg font-bold text-gray-900">{stat.value}</Text>
            </View>
          ))}
        </View>

        <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Recent Activity</Text>
          {[1, 2, 3].map((item) => (
            <View key={item} className="flex-row items-center py-3 border-b border-gray-50 last:border-0">
              <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                <LayoutDashboard size={18} color="#6b7280" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-sm font-medium text-gray-900">System Update {item}</Text>
                <Text className="text-xs text-gray-500">2 hours ago</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          onPress={logout}
          className="bg-red-50 p-4 rounded-xl flex-row items-center justify-center mb-10"
        >
          <LogOut size={20} color="#dc2626" />
          <Text className="ml-2 text-red-600 font-bold">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

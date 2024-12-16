import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Pressable } from 'react-native';

import { auth } from '../../components/firebase/firebaseConfig';


export default function TabLayout() {
  const colorScheme = useColorScheme();


  return (
    <Tabs >
        
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        headerShown: false,
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,

        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />,
        }}
      />
    
       
     
    </Tabs>
  );
}

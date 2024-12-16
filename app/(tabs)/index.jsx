import {Text, View, Pressable } from 'react-native';
import '../../global.css';
import { Link, router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import  useAuth  from '../authContext';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../../components/firebase/firebaseConfig';

export default function HomeScreen() {
const { user, signOut } = useAuth();
const navigation = useNavigation();


  return (
    <SafeAreaView>
     <ScrollView>
   <View className='w-full h-screen bg-blue-500 p-5 flex items-center '>
    <View className='w-full flex justify-start'>

      <Text className='text-3xl font-bold text-white'>Bienvenido!</Text>
      <Pressable onPress={() => signOut()} >
      <Text>Logout</Text>
      </Pressable>
    </View>
  
  <View className='w-[95%] h-52 bg-blue-600 rounded-md mb-5 mt-5 flex items-center justify-center p-5 '>
     <Text className='text-2xl font-bold color-white'>Versículo del Día</Text>
     <Text className='text-lg font-bold color-white'>
     "Porque de tal manera amó Dios al mundo, que dio a su Hijo unigénito, para que todo aquel que cree en Él, no se pierda, mas tenga vida eterna."
       (Juan 3:16)
     </Text>
    <View className='w-full flex flex-row justify-end'>
    
      <MaterialIcons name="favorite" size={24} color="white" />
     
    </View>
  </View>
  
  <Link href="/bibleQuiz" className='w-full flex'> 
  <View className='w-52 h-52 bg-white rounded-md flex justify-start items-center pt-2'>
   <View className='w-48 h-32 bg-slate-400 flex items-center justify-center rounded-md'>
<View className='w-28 h-28 bg-slate-500 flex flex-row items-center justify-center rounded-full'>
<MaterialCommunityIcons name="book-open-page-variant" size={50} color="yellow" />

</View>
   </View>
   <Text> Bible Test</Text>
  </View>
  </Link>


   </View>
   </ScrollView> 
   </SafeAreaView>
  );
}

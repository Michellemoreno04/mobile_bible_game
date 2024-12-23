import {Text, View, Pressable,StyleSheet,Image } from 'react-native';
import '../../global.css';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import  useAuth  from '../authContext';
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/components/firebase/firebaseConfig';


export default function HomeScreen() {
  
const { user, signOut } = useAuth();
const navigation = useNavigation();
const [userAuthenticated, setUserAuthenticated] = useState({});

useEffect(() => {
  // aqui vamos a traer la informacion del usuario de lA db 
  const userRef = doc(db, 'users', user?.uid);
  const unsubscribe = onSnapshot(userRef, (doc) => {
    setUserAuthenticated(doc.data());
  });
  return () => {
    unsubscribe();
  };
  
},[user])


  return (
    <SafeAreaView>
     <ScrollView>
   <View style={styles.screen}  className='w-full h-screen bg-gray-200 p-5 pt-C '>
    <View className='w-full  flex justify-start items-center flex-row gap-3 pb-3'>
       <Image source={require('../../assets/images/icon.png')}
       className='w-14 h-14 rounded-full'
       
       />
      <View >
      <Text className='text-2xl font-bold '>{userAuthenticated.name}</Text>
        <Text className='w-28 flex text-center bg-gray-300 rounded-full p-1'>Estudioso</Text>
      </View>
      <Pressable onPress={() => signOut()} >
      <Text>Logout</Text>
      </Pressable>
    </View>
  
  <View style={styles.verseContainer}>
     <Text className='text-2xl font-bold '>Versículo del Día</Text>
     <Text className='text-lg font-bold '>
     "Porque de tal manera amó Dios al mundo, que dio a su Hijo unigénito, para que todo aquel que cree en Él, no se pierda, mas tenga vida eterna."
       (Juan 3:16)
     </Text>
    <View className='w-full flex flex-row justify-end'>
    
      <MaterialIcons name="favorite" size={24} color="red" />
     
    </View>
  </View>

  <View className='w-full  flex justify-start mb-5'>
    <Text className='text-3xl font-bold'>Explora </Text>
  </View>
  
<View className='w-full h-screen flex flex-row justify-center gap-2 '>
  <View style={styles.estudiaContainer} className='w-52 h-52 flex flex-col justify-center items-center bg-white'  >
 <Link href='/bibleQuiz'>
    <MaterialCommunityIcons name="book-open-page-variant" size={100} color="black"  />
  </Link>
   
   <Text className='text-center font-bold text-2xl ' >
    Estudia
    </Text>
  </View>

  <View style={styles.estudiaContainer} className='w-52 h-52 flex flex-col justify-center items-center bg-white'  >
  
  <Link href='/versiculosFavoritos'>
   <AntDesign name="heart" size={50} color="red" />
  </Link>
  
   <Text className='text-2xl  font-bold mt-2'>Versiculos favoritos</Text>

  

  </View>
  </View>
  </View>

   </ScrollView> 
   </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  verseContainer: {
    with: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddiing: 10
  },
  exploraCointainer: {
    with: '100%',
    height: 500,
    flexDirection: 'row',
    gap:2,
    backgroundColor:'white',
    borderRadius: 10,
    
    paddingHorizontal:10,
    
  },
  estudiaContainer: {
    borderRadius: 10,
  }
   
  
});
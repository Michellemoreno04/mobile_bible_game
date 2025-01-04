import { View, Text, ScrollView,Pressable,Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import React,{useEffect, useState} from 'react';
import  useAuth  from '../authContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../components/firebase/firebaseConfig';
import { Avatar } from 'react-native-paper';


export default function Profile() {
  const insignias = ['plata', 'oro', 'diamante', 'platino'];
  const librosAprendidos = ['libro 1', 'libro 2', 'libro 3', 'libro 4', 'libro 5', 'libro 6'];
  const [userInfo, setUserInfo] = useState({});



  const {user,signOut } = useAuth();

 

  // aqui vamos a traer los datos de la db
 useEffect(() => {
  const userRef = doc(db, 'users', user?.uid);
  const unsubscribe = onSnapshot(userRef, (doc) => {
    setUserInfo(doc.data());
  });
  return () => {
    unsubscribe();
  };

 },[user]);
  


const salir = () => {
  Alert.alert('Salir', '¿Esta seguro de que desea salir?', [
    {
      text: 'Cancelar',
      style: 'cancel',
    },
    {
      text: 'Salir',
       onPress: () => {
        console.log('Saliendo...');
        signOut();
      },  
    }
  ]
  );
}


  return (
    
    <ScrollView className="w-full h-full bg-blue-400">
      <SafeAreaView>
        <View className='w-full flex flex-row justify-end items-center pr-5'>
          <Pressable onPress={salir}>
        <Entypo name="log-out" size={24} color="black" /> 
        </Pressable>
        </View>
      
      <View className="w-[90%] h-64 bg-blue-500 rounded-md flex items-center justify-center self-center  mt-5">
        <View>
          <Avatar.Image size={100} source={require('../../assets/images/icon.png')} />
        </View>
        <Text className="text-3xl font-bold text-white">{userInfo?.name}</Text>
        
        <View className="w-full flex flex-row justify-between p-5 ">
          <View className='flex flex-col items-center justify-center'>
            <Text className="text-xl font-bold text-white">{userInfo?.Racha}</Text>
            <Text className="text-2xl font-bold text-white">Racha</Text>
          </View>
          <View className='flex flex-col items-center justify-center' >
            <Text className="text-xl font-bold text-white">{userInfo?.exp}</Text>
            <Text className="text-2xl font-bold text-white">Exp</Text>
          </View>
          <View className='flex flex-col items-center justify-center'>
            <Text className="text-xl font-bold text-white">{userInfo?.monedas}</Text>
            <Text className="text-2xl font-bold text-white">Monedas</Text>
          </View>
        </View>
      </View>

      <View className="w-full p-5">
        <Text className="text-3xl font-bold text-black">Insignias</Text>
        <View className="w-full flex flex-row flex-wrap">
          {insignias.map((insignia, index) => (
            <View
              key={index}
              className="w-40 h-10 p-2 m-1 bg-gray-200 rounded-full flex items-center justify-center"
            >
              <Text>{insignia}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="w-full p-5">
        <Text className="text-3xl font-bold text-black">Libros aprendidos</Text>
        <View className="w-full flex flex-row flex-wrap">
          {librosAprendidos.map((libro, index) => (
            <View
              key={index}
              className="w-full h-10 p-2 m-1 bg-gray-200 rounded-md flex items-center justify-center"
            >
              <Text>{libro}</Text>
            </View>
          ))}
        </View>
      </View>
      </SafeAreaView>
    </ScrollView>
   
  );
}


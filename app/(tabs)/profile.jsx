import { View, Text, ScrollView,Pressable,Alert, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import React,{useEffect, useState} from 'react';
import  useAuth  from '../authContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../components/firebase/firebaseConfig';
import { Avatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { niveles } from '@/components/Niveles/niveles';

export default function Profile() {
  const insignias = ['plata', 'oro', 'diamante', 'platino'];
  const librosAprendidos = ['libro 1', 'libro 2', 'libro 3', 'libro 4', 'libro 5', 'libro 6'];
  const [userInfo, setUserInfo] = useState({});
  const {user,signOut } = useAuth();

 

  // aqui vamos a traer los datos de la db
 useEffect(() => {
if(!user) return;

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
       onPress: async () => {
        console.log('Saliendo...');
       await signOut();
        navigation.replace('Login'); // Redirigir a la pantalla de login
      },  
    }
  ]
  );
}


  return (
    
    (
        <ImageBackground source={require('../../assets/images/bg-cohete.png')} style={{flex:1}}>
      <ScrollView>
          <SafeAreaView>
            
            <View className="w-full flex flex-row justify-end items-center pr-5 pt-5">
              <Pressable onPress={salir}>
                <Entypo name="log-out" size={24} color="black" />
              </Pressable>
            </View>
  
            {/* Blue Card */}
            <View className="w-[90%]  bg-sky-500 rounded-md items-center self-center p-5 pb-5 mt-5">
              <Avatar.Image size={100} source={require('../../assets/images/icon.png')} />
              <Text className="text-3xl font-bold text-white mt-3">{userInfo?.Name}</Text>
              <View className="w-full flex flex-row justify-between mt-5">
                {/* Racha Máxima */}
                <View className="flex flex-col items-center">
                  <Text className="text-xl font-bold text-white">{userInfo?.RachaMaxima}</Text>
                  <Text className="text-lg font-bold text-white">Racha máxima</Text>
                </View>
                {/* Nivel */}
                <View className="flex flex-col items-center">
                  <Text className="text-xl font-bold text-white">{niveles(userInfo?.Exp).insignia}</Text>
                  <Text className="text-lg font-bold text-white">Nivel {userInfo?.Nivel}</Text>
                </View>
                {/* Monedas */}
                <View className="flex flex-col items-center">
                  <Text className="text-xl font-bold text-white">{userInfo?.Monedas}</Text>
                  <Text className="text-lg font-bold text-white">Monedas</Text>
                </View>
              </View>
            </View>
               {/*estado */}
               <View className='p-5'>
                <Text className='text-2xl text-white font-bold'>Descripcion</Text>
                <Text className='text-lg text-white'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, eum ratione ipsam voluptatem 
                  delectus deserunt minus qui enim reiciendis iste necessitatibus maiores dolorem 
                  commodi temporibus quaerat at unde. Sint, quis?
                </Text>
               </View>
            
           
          </SafeAreaView>
      </ScrollView>
        </ImageBackground>
    )
  );
}


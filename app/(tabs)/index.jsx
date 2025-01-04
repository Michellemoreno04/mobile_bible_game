import {Text, View, Pressable,StyleSheet, Alert,Animated,ScrollView } from 'react-native';
import '../../global.css';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import  useAuth  from '../authContext';
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/components/firebase/firebaseConfig';
import { Avatar } from 'react-native-paper';
import { collection, addDoc } from 'firebase/firestore';
import {niveles} from '@/components/Niveles/niveles';


export default function HomeScreen() {
  
const { user } = useAuth();
const navigation = useNavigation();
const [userAuthenticated, setUserAuthenticated] = useState({});
const [esFavorito, setEsFavorito] = useState(false);
const [showModalRacha, setShowModalRacha] = useState(false);
const escala = new Animated.Value(1); // Animación de escala

const versiculoDiario = {
  referencia: "Juan 3:16",
  versiculo: "Porque de tal manera amó Dios al mundo, que dio a su Hijo unigénito, para que todo aquel que cree en Él, no se pierda, mas tenga vida eterna.",
}



// aqui vamos a traer la informacion del usuario de la db
useEffect(() => {

  // Solo ejecutar el efecto si `user` está definido
  if (!user) return;
  
  // aqui vamos a traer la informacion del usuario de lA db 
  const userRef = doc(db, 'users', user?.uid);
  const unsubscribe = onSnapshot(userRef, (doc) => {
    setUserAuthenticated(doc.data());
  });
  return () => {
    unsubscribe();
  };
  
},[user])

// aqui vamos a guardar los versiculos favoritos en una colección de la db
const guardarVersiculo = async ({ versiculo, referencia, userId}) => {
  try {
    if (!userId) {
      console.error("El usuario no está autenticado.");
      return;
    }

    const userFavoritesRef = collection(db, `users/${userId}/versiculosFavoritos`);
    await addDoc(userFavoritesRef, {
      referencia,
      versiculo,
      timestamp: new Date()
    });

   Alert.alert('Versículo guardado exitosamente.');
  } catch (error) {
    console.error('Error al guardar el versículo:', error);
  }
};

 // Animación del ícono para guardar versículo
 const animarIcono = () => {
  Animated.sequence([
    Animated.timing(escala, { toValue: 1.5, duration: 200, useNativeDriver: true }),
    Animated.timing(escala, { toValue: 1, duration: 200, useNativeDriver: true }),
  ]).start();
};



return (
    <SafeAreaView>
     <ScrollView>
   <View style={styles.screen}  className='w-full h-screen bg-gray-200 p-5 pt-C '>
    <View className='w-full  flex justify-start items-center flex-row gap-3 pb-3'>
       <Avatar.Image size={45} source={require('../../assets/images/icon.png')}
       className='w-14 h-14 rounded-full'
       
       />
      <View >
      <Text className='text-2xl font-bold '>{userAuthenticated?.name}</Text>
        <Text className='flex text-center bg-gray-300 rounded-full p-1'>{niveles(userAuthenticated?.nivel)}</Text>
      </View>
      
    </View>
    
  <View style={styles.verseContainer}>
     <Text className='text-2xl font-bold '>{versiculoDiario.referencia}</Text>
     <Text className='text-lg font-bold '>
     {versiculoDiario.versiculo}
     </Text>
    <View className='w-full flex flex-row justify-end'>
    
    <Pressable onPress={() => {
      if (!esFavorito) {
        guardarVersiculo({versiculo: versiculoDiario.versiculo,
          referencia: versiculoDiario.referencia,
          userId: user?.uid,});
      }
      animarIcono(); // Ejecutar la animación al guardar
      setEsFavorito(true); // Cambiar a favorito
    }}>
      <Animated.View style={{ transform: [{ scale: escala }] }}>
        <MaterialIcons name="favorite" size={24} color={esFavorito ? 'red' : 'gray'} />
      </Animated.View>
    </Pressable>

     
    </View>
  </View>
  

  <View className='w-full  flex justify-start mb-5 mt-3'>
    <Text className='text-3xl font-bold'>Explora </Text>
  </View>
  
<View className='w-full h-screen flex flex-row justify-center gap-2 '>
 <Link href='/bibleQuiz'>
  <View style={styles.estudiaContainer} className='w-52 h-52 flex flex-col justify-center items-center bg-white'  >
    <MaterialCommunityIcons name="book-open-page-variant" size={100} color="black"  />
 
   
   <Text className='text-center font-bold text-2xl ' >
    Estudia
    </Text>
  </View>
  </Link>

  <Link href='/versiculosFavoritos'>
  <View style={styles.estudiaContainer} className='w-52 h-52 flex flex-col justify-center items-center bg-white'  >
  
   <AntDesign name="heart" size={50} color="red" />
  
  
   <Text className='text-2xl  font-bold mt-2'>Versiculos favoritos</Text>

  

  </View>
  </Link>
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
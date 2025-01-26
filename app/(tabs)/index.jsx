import { Text, View, StyleSheet, SafeAreaView, ScrollView, Alert, Image,TouchableWithoutFeedback, Modal } from 'react-native';
import '../../global.css';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useAuth from '../authContext';
import React, { useEffect, useState,useRef } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/components/firebase/firebaseConfig';
import { Avatar } from 'react-native-paper';
import { niveles } from '@/components/Niveles/niveles';
import VersiculosDiarios from '@/components/VersiculoDiario/versiculoDiario';
import NivelModal from '@/components/Modales/modalNivel';
import { useNavigation } from 'expo-router';
import LottieView from 'lottie-react-native';



export default function AppComponent() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [userAuthenticated, setUserAuthenticated] = useState({});
  const [showNivelModal, setShowNivelModal] = useState(false);
  const [nivelAnterior, setNivelAnterior] = useState(null);
  const [showFullScreen, setShowFullScreen] = useState(false);
 
  
  const animationRef = useRef(null); 
  // maneja la animación de cerebro
  useEffect(() => {
    setTimeout(() => {
      animationRef.current?.play(0, 280);
    })
   navigation.addListener("focus", () => {
    
      if (animationRef.current) {

        animationRef.current.play(0, 280); // Reproduce la animación
      }
   })
   

  }, [navigation]);
 
  const handleAnimationPress = () => {
    setShowFullScreen(true); 
  };

  const handleAnimationFinish = () => {
    setShowFullScreen(false); 
    navigation.navigate('bibleQuiz');
  };
  const userId = user?.uid;

  useEffect(() => {
    if (!userId) return;

    const userRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const userData = snapshot.data() || {};
      setUserAuthenticated(userData);

      if (userData.Exp) {
        const nivelActual = niveles(userData.Exp).nivel;
        const nivelAnterior = userData.Nivel || 0;

        updateDoc(userRef, { Nivel: nivelActual });

        if (nivelAnterior !== null && nivelActual > nivelAnterior) {
          Alert.alert(
            'has subido de nivel',
            `Has subido del nivel ${nivelAnterior} al ${nivelActual}`,
            [{ text: 'OK', onPress: () => setShowNivelModal(true) }]
          );
        }

        setNivelAnterior(nivelActual);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  return (
      <SafeAreaView>
        <ScrollView >
        <View style={styles.screen} className='bg-gray-100'>
          <NivelModal
            userInfo={userAuthenticated?.Nivel}
            isVisible={showNivelModal}
            onClose={() => setShowNivelModal(false)}
          />
          
          <View style={styles.headerContainer}>
  {/* Contenedor Izquierdo: Avatar e Información */}
  <View style={styles.leftContainer}>
    <Avatar.Image size={50} source={require('../../assets/images/Loader.png')} />
    <View style={styles.userInfo}>
      <Text style={styles.greeting}>
        {`Hola!, ${userAuthenticated?.Name || 'Anónimo'}`}
      </Text>
      <Text style={styles.level}>
        {`Nivel ${niveles(userAuthenticated?.Exp || 0).nivel} -> ${niveles(userAuthenticated?.Exp || 0).insignia}`}
      </Text>
    </View>
  </View>

  {/* Contenedor Derecho: Racha */}
  <View style={styles.rachaContainer}>
    <Text style={styles.rachaText}>{userAuthenticated?.Racha || 0}</Text>
    <MaterialCommunityIcons name="lightning-bolt-outline" size={26} color="black" />
  </View>
</View>


            <VersiculosDiarios />

            <View className="w-full flex justify-start mb-5 mt-5">
              <Text className="text-3xl font-bold">Explora</Text>
            </View>
            <View style={styles.estudiaContainer}>
              <View  style={styles.estudia} >
              <TouchableWithoutFeedback onPress={handleAnimationPress}>
                
                  <View className="flex justify-center items-center">
                  <View className="w-24 h-24 flex justify-center items-center rounded-full bg-blue-100">
                  <LottieView source={require('../../assets/lottieFiles/cerebro.json')}  autoPlay loop={false}
                    style={{width: 100, height: 100} } resizeMode='cover' ref={animationRef} onAnimationFinish={animationRef.current?.pause} />

                  </View>
                    <Text className="text-center font-bold text-2xl text-blue-400">Refuerza Conocimientos</Text>
                  </View>
                
              </TouchableWithoutFeedback>

               {/* Modal para animación de pantalla completa */}
      <Modal visible={showFullScreen} transparent={true}>
        <View style={styles.modalContainer}>
          <LottieView
            ref={animationRef}
            source={require('../../assets/lottieFiles/cerebro.json')}
            autoPlay
            loop={false}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
            onAnimationFinish={() => {
              handleAnimationFinish();
            }}
          />
        </View>
      </Modal>
        
    
              </View>
              <View style={styles.estudia}>
                <Link href="/versiculosFavoritos">
                  <View className="flex justify-center items-center">
                  <View className="w-24 h-24 flex justify-center items-center rounded-full bg-blue-100">
                    <Image source={require('../../assets/images/book3d.png')} style={{width: 60, height: 60} } resizeMode='contain' />

                   
                  </View>
                    <Text className="text-center font-bold text-2xl text-blue-400">Versículos favoritos</Text>
                  </View>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    
  );
}



const styles = StyleSheet.create({
  screen: {
    height: '100%',
    padding: 10,
    
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Separar elementos a los extremos
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  level: {
    fontSize: 14,
    color: '#555',
  },
  rachaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Fondo claro
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 2, // Sombra sutil
  },
  rachaText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5, // Separación entre texto e ícono
  },
  estudiaContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  estudia: {
    width: 185,
    height: 185,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo oscuro para resaltar la animación
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import { Text, View, StyleSheet, SafeAreaView, ScrollView, Alert, ImageBackground, Image,TouchableWithoutFeedback, Modal,RefreshControl } from 'react-native';
import '../../global.css';
import { Link } from 'expo-router';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import useAuth from '../authContext';
import React, { useEffect, useState,useRef } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/components/firebase/firebaseConfig';
import { Avatar } from 'react-native-paper';
import { niveles } from '@/components/Niveles/niveles';
import VersiculosDiarios from '@/components/VersiculoDiario/versiculoDiario';
import NivelModal from '@/components/Modales/modalNivel';
import { LinearGradient } from 'expo-linear-gradient';
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
        <ImageBackground source={require('../../assets/images/bg-cohete.png')} style={styles.imageBackground}>
        <View style={styles.screen}>
        <ScrollView >
          <NivelModal
            userInfo={userAuthenticated?.Nivel}
            isVisible={showNivelModal}
            onClose={() => setShowNivelModal(false)}
          />
          
            <View className="w-full flex justify-start items-center flex-row gap-3 pb-3">
              <Avatar.Image size={50} source={require('../../assets/images/Loader.png')} />
              <View>
                <Text className="text-2xl font-bold">{userAuthenticated?.Name || 'Anonimo'}</Text>
                <Text className="flex text-center bg-gray-300 rounded-full p-1 text-gray-500">
                  {`Nivel ${niveles(userAuthenticated?.Exp || 0).nivel} ${niveles(userAuthenticated?.Exp || 0).insignia}`}
                </Text>
              </View>
            </View>

            <VersiculosDiarios />

            <View className="w-full flex justify-start mb-5 mt-5">
              <Text className="text-3xl font-bold text-white">Explora</Text>
            </View>
            <View style={styles.estudiaContainer}>
              <View  style={styles.estudia} >
              <TouchableWithoutFeedback onPress={handleAnimationPress}>
                
                  <View className="flex justify-center items-center">
                  <LottieView source={require('../../assets/lottieFiles/cerebro.json')}  autoPlay loop={false}
                    style={{width: 200, height: 100} } resizeMode='cover' ref={animationRef} onAnimationFinish={animationRef.current?.pause} />

                    <Text className="text-center font-bold text-2xl text-white">Refuerza Conocimientos</Text>
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
                    <Image source={require('../../assets/images/book3d.png')} style={{width: 100, height: 100,flex: 1} } resizeMode='cover'>

                    </Image>
                    <Text className="text-center font-bold text-2xl text-white">Versículos favoritos</Text>
                  </View>
                </Link>
              </View>
            </View>
        </ScrollView>
          </View>
        </ImageBackground>
      </SafeAreaView>
    
  );
}



const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    padding: 10,
   // backgroundColor: '#1f2937',
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
    backgroundColor: 'skyblue',
   //boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)',
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo oscuro para resaltar la animación
    justifyContent: 'center',
    alignItems: 'center',
  },
});

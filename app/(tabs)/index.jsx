import { Text, View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import '../../global.css';
import { Link } from 'expo-router';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import useAuth from '../authContext';
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/components/firebase/firebaseConfig';
import { Avatar } from 'react-native-paper';
import { niveles } from '@/components/Niveles/niveles';
import VersiculosDiarios from '@/components/VersiculoDiario/versiculoDiario';
import NivelModal from '@/components/Modales/modalNivel';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';



export default function AppComponent() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [userAuthenticated, setUserAuthenticated] = useState({});
  const [showNivelModal, setShowNivelModal] = useState(false);
  const [nivelAnterior, setNivelAnterior] = useState(null);

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
    <LinearGradient colors={['#ffcc00', '#ff8a00']} style={{ flex: 1 }}>
      <SafeAreaView>
        <ScrollView>
          <NivelModal
            userInfo={userAuthenticated?.Nivel}
            isVisible={showNivelModal}
            onClose={() => setShowNivelModal(false)}
          />
          <View style={styles.screen}>
            <View className="w-full flex justify-start items-center flex-row gap-3 pb-5">
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
              <View style={styles.estudia}>
                <Link href="/bibleQuiz">
                  <View className="flex justify-center items-center">
                    <MaterialCommunityIcons name="book-open-page-variant" size={100} color="white" />
                    <Text className="text-center font-bold text-2xl text-white">Estudia</Text>
                  </View>
                </Link>
              </View>
              <View style={styles.estudia}>
                <Link href="/versiculosFavoritos">
                  <View className="flex justify-center items-center">
                    <AntDesign name="heart" size={100} color="red" />
                    <Text className="text-center font-bold text-2xl text-white">Versículos favoritos</Text>
                  </View>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}



const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    padding: 20,
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
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff8a00',
    margin: 10,
  },
});

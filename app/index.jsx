import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebase/firebaseConfig';
import useAuth from './authContext';
import LottieView from 'lottie-react-native' ;
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../app/(tabs)/index';

 export default function SignUpScreen() {

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate('(tabs)');
    }
  }, [user]);
/*
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({ 
    androidClientId: '4928746886-v7b5nq4bic8hrgkvmer6hq2taojjjkku.apps.googleusercontent.com',
  //  iosClientId: '',
  });
  */

  const navigation = useNavigation();

  /*useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        
    }
  }, [response]);
*/

  const handleEmailSignUp = () => {
    navigation.navigate('login');
    console.log('go to login');

    
  };

  const handleFacebookSignUp = () => {
    console.log('Sign up with Facebook');
  };
  
  return (
    <View className='w-full h-full   flex items-center justify-center p-10 absolute top-0 left-0 right-0 bottom-0 bg-black/60'>
      <Text className="text-center text-3xl font-bold text-white">Bienvenido a "Estudio Bíblico Diario"</Text>
      <Text className="text-center text-lg pb-5  text-gray-100">
        Nuestra app está diseñada para ayudarte a estudiar la Biblia todos los días y fortalecer tu relación espiritual.
      </Text>
      <View className='p-10'>
      <LottieView source={require('../assets/lottieFiles/llegaste.json')}  autoPlay loop 
      style={{width: 300, height: 300}}/>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEmailSignUp}>
        <FontAwesome name="envelope" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Registrarse con Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.facebookButton]} onPress={handleFacebookSignUp}>
        <FontAwesome name="facebook" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Registrarse con Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.googleButton]}
       onPress={() => console.log('Sign up with Google pending')}>
        <FontAwesome name="google" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Registrarse con Google</Text>
      </TouchableOpacity>
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

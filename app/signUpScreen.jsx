import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useAuth from './authContext';
import LottieView from 'lottie-react-native' ;
import { LinearGradient } from 'expo-linear-gradient';


 export default function SignUpScreen() {

  const { user } = useAuth();




  const navigation = useNavigation();


  const handleEmailSignUp = () => {
    navigation.navigate('login');
    console.log('go to login');

    
  };

  const handleFacebookSignUp = () => {
    console.log('Sign up with Facebook');
  };
  
  return (
            <LinearGradient colors={['#ffcc00', '#ff8a00']} style={{ flex: 1 }}>
    
    <View className='w-full h-full    flex items-center justify-center p-5 '>
      <Text className="text-center text-3xl font-bold text-white">Bienvenido a "BibleBrain"</Text>
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

    </LinearGradient>
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

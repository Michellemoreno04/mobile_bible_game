import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebase/firebaseConfig';
import useAuth from './authContext';
export default function SignUpScreen() {

  const { user } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigation.navigate('(tabs)');
      }
    });
  }, [user]);



  const handleEmailSignUp = () => {
    console.log('go to login');
    navigation.navigate('login');
    
  };

  const handleFacebookSignUp = () => {
    console.log('Sign up with Facebook');
  };

  const handleGoogleSignUp = () => {
    console.log('Sign up with Google');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a "Estudio Bíblico Diario"</Text>
      <Text style={styles.description}>
        Nuestra app está diseñada para ayudarte a estudiar la Biblia todos los días y fortalecer tu relación espiritual.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleEmailSignUp}>
        <FontAwesome name="envelope" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Registrarse con Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.facebookButton]} onPress={handleFacebookSignUp}>
        <FontAwesome name="facebook" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Registrarse con Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handleGoogleSignUp}>
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

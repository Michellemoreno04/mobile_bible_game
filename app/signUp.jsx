import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Pressable, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../components/firebase/firebaseConfig'
import { useNavigation } from '@react-navigation/native';



const SignUp = () => {
  const navigate = useNavigation();
  const [credenciales, setCredenciales] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  

 const handlerOnChange = (field, value) => {
  setCredenciales((prevCredenciales) => ({
    ...prevCredenciales,
    [field]: value,// Establece el valor del campo correspondiente
  }));
};
const handleSignUp = () => {
  if (credenciales.name && credenciales.email && credenciales.password ) {
createUserWithEmailAndPassword(auth, credenciales.email, credenciales.password)
  .then((userCredential) => {
    // Signed up 
    
    const user = userCredential.user;
    console.log('user logged', user);

    setCredenciales({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    navigate.navigate('(tabs)');

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  } else {
    Alert.alert('Por favor, complete todos los campos.');
  }
};

  return (
    <View className='w-full h-full p-10 flex items-center justify-center gap-5' >
      <View>
        <Text className='text-3xl font-bold color-black'>Bible Game</Text>
        <Text>Registrate para continuar</Text>
      </View>
      <TextInput
        className='w-full h-14 border border-gray-300 rounded-md p-2'
        placeholder="Nombre"
        value={credenciales.name}
        onChangeText={(text) => handlerOnChange('name', text)}
        keyboardType="default"
      />
      <TextInput
        className='w-full h-14 border border-gray-300 rounded-md p-2'
        placeholder="correo electronico"
        value={credenciales.email}
        onChangeText={(text) => handlerOnChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        className='w-full h-14 border border-gray-300 rounded-md p-2'
        placeholder="contraseña"
        value={credenciales.password}
        onChangeText={(text) => handlerOnChange('password', text)}
        secureTextEntry
      />
      <TextInput
      className='w-full h-14 border border-gray-300 rounded-md p-2'
        placeholder="Confirmar contraseña"
        value={credenciales.confirmPassword}
        onChangeText={(text) => handlerOnChange('confirmPassword', text)}
        secureTextEntry
      />
      {error ? <Text >{error}</Text> : null}
      <Pressable
      onPress={handleSignUp}
      className='w-full h-14 flex items-center justify-center border-gray-300 rounded-md bg-blue-500 p-2'>
        <Text className='color-white'>Registrate</Text>
      </Pressable>

      <Pressable className='w-full h-14 flex flex-row items-center border border-gray-300 rounded-md p-2 justify-center gap-2'>
                <AntDesign name="google" size={24} color="black" />
              <Text>Cuenta de Google</Text>
            </Pressable>

      <Text >
        Ya tienes una cuenta?{' '}
        <Link href="/login">
        <Text className='text-blue-500' >
          inicia seccion
        </Text> 
        </Link>
      </Text>
           
    </View>
  );
};



export default SignUp;

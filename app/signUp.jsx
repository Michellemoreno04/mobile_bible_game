import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, ImageBackground, Text, StyleSheet, Pressable, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from '../components/firebase/firebaseConfig'
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc, Timestamp } from 'firebase/firestore';




const SignUp = () => {
  const navigate = useNavigation();
  const [credenciales, setCredenciales] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [vidas, setVidas] = useState(3);
  const [monedas, setMonedas] = useState(200);
  const [exp, setExp] = useState(0);
  const [nivel,setNivel] = useState(1);
  

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
    const user = userCredential.user;
    try{
      setDoc(doc(db, "users", user.uid), {
        name: credenciales.name,
        email: credenciales.email,
        Timestamp: Timestamp.now(),
        vidas: vidas,
        monedas: monedas,
        exp: exp,
        nivel: nivel
      });
    } catch (error) {
  
      console.log(error);
      return error
    }


    console.log('user logged');

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
    handleFirebaseError(error);
    // ..
  });

  } else {
    Alert.alert('Por favor, complete todos los campos.');
  }
};

// Función para manejar los errores de Firebase
const handleFirebaseError = (error) => {
  let errorMessage = "Ocurrió un error. Por favor, inténtalo de nuevo.";

  switch (error.code) {
    case "auth/invalid-email":
      errorMessage = "El correo electrónico no es válido. Verifica el formato.";
      break;
    case "auth/user-not-found":
      errorMessage = "No se encontró una cuenta con este correo. Regístrate primero.";
      break;
    case "auth/wrong-password":
      errorMessage = "La contraseña es incorrecta. Inténtalo de nuevo.";
      break;
    case "auth/invalid-credential":
      errorMessage = "Las credenciales ingresadas no son válidas. Intenta nuevamente.";
      break;
    default:
      errorMessage = "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.";
  }

  // Muestra el mensaje de error con una alerta
  Alert.alert("Error de inicio de sesión", errorMessage, [{ text: "Entendido" }]);
};

  return (
    <View className="w-full h-full flex items-center justify-center p-10 absolute top-0 left-0 right-0 bottom-0 bg-black/60 gap-4" >
      <View>
        <Text className='text-3xl font-bold color-white '>Bible Game</Text>
        <Text className='text-lg font-bold color-white'>Registrate para continuar</Text>
      </View>
      <TextInput
        className='w-full h-14 border border-gray-300 rounded-md p-2 text-white'
        placeholder="Nombre"
        placeholderTextColor="#ccc"
        value={credenciales.name}
        onChangeText={(text) => handlerOnChange('name', text)}
        keyboardType="default"
      />
      <TextInput
        className='w-full h-14 border border-gray-300 rounded-md p-2 text-white'
        placeholder="correo electronico"
        placeholderTextColor="#ccc"
        value={credenciales.email}
        onChangeText={(text) => handlerOnChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        className='w-full h-14 border border-gray-300 rounded-md p-2 text-white'
        placeholder="contraseña"
        placeholderTextColor="#ccc"
        value={credenciales.password}
        onChangeText={(text) => handlerOnChange('password', text)}
        secureTextEntry
      />
      <TextInput
      className='w-full h-14 border border-gray-300 rounded-md p-2 text-white'
        placeholder="Confirmar contraseña"
        placeholderTextColor={'#ccc'}
        value={credenciales.confirmPassword}
        onChangeText={(text) => handlerOnChange('confirmPassword', text)}
        secureTextEntry
      />
      {error ? <Text >{error}</Text> : null}
      <Pressable
      onPress={handleSignUp}
      className='w-full h-14 flex items-center justify-center border-gray-300 rounded-md bg-blue-500 p-2 mt-3'>
        <Text className='color-white'>Registrate</Text>
      </Pressable>

      <Pressable className='w-full h-14 flex flex-row items-center border border-gray-300 rounded-md p-2 justify-center gap-2'>
                <AntDesign name="google" size={24} color="#fff" />
              <Text className='color-white'>Cuenta de Google</Text>
            </Pressable>

      <Text className='color-white' >
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

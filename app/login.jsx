import React, { useState } from 'react'
import { Text, View, TextInput, Pressable, Alert,ImageBackground } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { auth } from '../components/firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { useRouter } from "expo-router";
import { db } from '../components/firebase/firebaseConfig';

function Login() {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
const navigation = useNavigation();

const [loginCredentials, setLoginCredentials] = useState({
   email: '',
   password: ''
   });

  const handlerOnchange = (field, value) => {
      setLoginCredentials((prevLoginCredentials) => ({
        ...prevLoginCredentials,
        [field]: value,
      }));
    };

    const handleLogin = () => {
      signInWithEmailAndPassword(auth, loginCredentials.email, loginCredentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User logged in');
          navigation.navigate("(tabs)");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Login error:', errorCode, errorMessage);
        });

      setLoginCredentials({
        email: '',
        password: ''
      })

    }

    // Función para manejar el inicio de sesión con Google(solopara la web no para las app)
  const handleGoogleLogin = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log('User logged in:', user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Login error:', errorCode, errorMessage);
        });
      }
      return (
        <ImageBackground
          source={require('../assets/images/bg-login.jpg')}
          className="w-full h-full flex items-center justify-center"
        >
          
          <View className="w-full h-full flex items-center justify-center p-10 absolute top-0 left-0 right-0 bottom-0 bg-black/60">
            <View className="w-full h-full flex items-center justify-center gap-5">
              
              <Text className="text-3xl font-bold text-white">Bible Game</Text>
              <Text className="text-lg font-bold text-white">
                Inicia sesión para continuar
              </Text>
      
             
              <TextInput
                className="w-full h-14 border border-gray-300 rounded-md p-2 text-white"
                placeholder="Email"
                placeholderTextColor="#ccc" /* Color gris para el placeholder */
                value={loginCredentials.email}
                textContentType="emailAddress"
                onChangeText={(text) => handlerOnchange('email', text)}
              />
      
              {/* Input de Password */}
              <TextInput
                className="w-full h-14 border border-gray-300 rounded-md p-2 text-white"
                placeholder="Password"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={loginCredentials.password}
                textContentType="password"
                onChangeText={(text) => handlerOnchange('password', text)}
              />
      
              
              <Pressable
                onPress={handleLogin}
                className="w-full h-14 flex items-center justify-center rounded-md bg-blue-500 p-2"
              >
                <Text className="text-white text-lg font-bold">Inicia Sesión</Text>
              </Pressable>
      
              {/* Sección de Login Alternativo */}
              <View className="w-full flex flex-col items-center justify-center gap-2">
                <Text className="text-white">- o inicia sesión con -</Text>
      
                <Pressable
                  className="w-full h-14 flex flex-row items-center border border-gray-300 rounded-md p-2 justify-center gap-2"
                  onPress={handleGoogleLogin}
                >
                  <AntDesign name="google" size={24} color="black" />
                  <Text className="text-white">Cuenta de Google</Text>
                </Pressable>
      
                {/* Link de Registro */}
                <View className="w-full flex flex-row items-center justify-center gap-2">
                  <Text className="text-white">¿No tienes una cuenta?</Text>
                  <Link href="/signUp">
                    <Text className="text-blue-500">Regístrate</Text>
                  </Link>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      );
}

export default Login;
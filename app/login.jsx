import React, { useState } from 'react'
import { Text, View, TextInput, Pressable, Alert } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { auth } from '../components/firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { useRouter } from "expo-router";

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
    <View className='w-full h-full  flex items-center justify-center p-10'>
     <View className='w-full h-full flex items-center justify-center gap-5' >
         <Text className='text-3xl font-bold color-black'>Bible Game</Text>
         <Text>Inicia sessión para continuar</Text>
         <TextInput 
         className='w-full h-14 border border-gray-300 rounded-md p-2'
         placeholder='Email'
         value={loginCredentials.email}
         textContentType='emailAddress'
         onChangeText={(text) => handlerOnchange('email', text)}
         />

         <TextInput 
         className='w-full h-14 border border-gray-300 rounded-md p-2'
         placeholder='Password'
         secureTextEntry
         value={loginCredentials.password}
         textContentType='password'
         onChangeText={(text) => handlerOnchange('password', text)}
         />

         <Pressable onPress={handleLogin}  className='w-full h-14 flex items-center justify-center border-gray-300 rounded-md bg-blue-500 p-2'>
          <Text className='bg-blue-500 flex items-center justify-center color-white'>Inicia Session</Text>
         </Pressable>
           <View className='w-full flex flex-col items-center justify-center gap-2'>
            <Text>- o inicia session con -</Text>
            
              <Pressable className='w-full h-14 flex flex-row items-center border border-gray-300 rounded-md p-2 justify-center gap-2'
              onPress={handleGoogleLogin}
              >
                <AntDesign name="google" size={24} color="black" />
              <Text>Cuenta de Google</Text>
              </Pressable>

            <View className='w-full flex flex-row items-center justify-center gap-2'>
            <Text>No tienes una cuenta?</Text>
            <Link href="/signUp">
              <Text className='text-blue-500'>Registrate</Text>
            </Link>
            </View>

           </View>

     </View>


    </View>
  )
}

export default Login;
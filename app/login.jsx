import React, { useState } from 'react'
import { Text, View, Pressable, Alert, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { auth } from '../components/firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from "expo-router";


function Login() {
  const router = useRouter();
 
const navigation = useNavigation();



const [loginCredentials, setLoginCredentials] = useState({
   email: '',
   password: ''
   });

   // 
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
          handleFirebaseError(error);
        });

      setLoginCredentials({
        email: '',
        password: ''
      })

    }

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
        
      );
}

export default Login;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Pressable } from 'react-native';
import { AntDesign, Octicons } from '@expo/vector-icons';
import { ArrayPreguntas } from '@/components/preguntas';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const BibleQuiz = () => {
const navigate = useNavigation();

  const [lives, setLives] = useState(3);
  const [coins, setCoins] = useState(200);
  const [Exp, setExp] = useState(0);
  const [questions, setQuestions] = useState(ArrayPreguntas);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);




  const pregunta = questions[currentQuestion].pregunta ;
  const referencia = questions[currentQuestion].referencia;
  const textoBiblico = questions[currentQuestion].textoBiblico;
  const correcta = questions[currentQuestion].correcta;
  const respuestas = questions[currentQuestion].respuestas;

  const comprobarRespuesta = () => {
    if (respuestaSeleccionada === null) {
      Alert.alert('Por favor, selecciona una respuesta.');
      return;
    }
if (currentQuestion === questions.length - 1) {
  Alert.alert('Has completado el quiz');
  // aqui podemos enseñar la puntuacion o redirige a otra pantalla
  // tambien se puede poner el limite de las preguntas 
  return;
}
    if (respuestaSeleccionada === correcta) {
      setExp(Exp + 25);
      
      Alert.alert('¡Respuesta correcta!');
      setCurrentQuestion(currentQuestion + 1);
      setRespuestaSeleccionada(null);
    } else {
      setLives(lives - 1);
      Alert.alert('¡Respuesta incorrecta!');
  
      setCurrentQuestion(currentQuestion + 1);
      setRespuestaSeleccionada(null);
    }
  
  };

const showTextoBiblico = () => {
  Alert.alert(referencia, textoBiblico, [
    { text: 'cerrar' },
  ]);
};

const skip = () => {
  if (currentQuestion < questions.length - 1) {
    setCoins(coins - 50);
    setCurrentQuestion(currentQuestion + 1);
    setRespuestaSeleccionada(null);
}else{
  Alert.alert('Has completado el quiz');
}
};


  return (
    <SafeAreaView>
    <View className='w-full h-full bg-gray-300 flex items-center p-5'>
      <View className='w-full flex flex-row justify-between items-center '>
        <Link href="(tabs)" asChild>
        <TouchableOpacity className='p-2'  >
        <Octicons name="home" size={30} color="black" />
        </TouchableOpacity>
        </Link>
        <View style={styles.statusBar}>
          <Text style={styles.status}>❤ {lives}</Text>
          <Text style={styles.status}>💰 {coins}</Text>
        </View>
      </View>
     
     <View className='w-full h-[90%] rounded-md bg-white flex items-center p-5 '>
      <View className='w-full h-52 bg-blue-600 rounded-md mb-5 mt-5 flex items-center justify-center p-5 '>
        <Text className='bg-blue-400 rounded-md p-2 absolute top-3 left-3'
        onPress={showTextoBiblico}
        >{referencia}</Text>
        <Text className='text-2xl'>{pregunta}</Text>
      </View>

      <View className='w-full flex flex-col items-center'>
        {respuestas.map((respuestas, index) => (
          <TouchableOpacity
          key={index}
          className={`w-[90%] h-16   rounded-md flex items-center justify-center m-1 ${
            respuestaSeleccionada === respuestas ? 'border-2 border-blue-500' : 'border-2 border-gray-300'
          }`}
          onPress={() => setRespuestaSeleccionada(respuestas)}
        >
          <Text className='text-2xl'>{respuestas}</Text>
        </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
       className='w-52 h-14 border-2 border-gray-500 bg-blue-500 rounded-md flex items-center justify-center flex-row gap-2 m-5'
       onPress={comprobarRespuesta}
       >
        
        <Text className='text-2xl font-bold text-white'>Comprabar</Text>
        <AntDesign name="rightcircleo" size={24} color="white" />
      </TouchableOpacity>

      <View className='w-full flex flex-row justify-around'>
        <TouchableOpacity
        onPress={skip}
        className='w-48 h-20 border-2 border-gray-500 bg-red-500 rounded-md flex items-center justify-center ' >
          <Text className='color-white'>💰{'50'}</Text>
          <Text className='color-white font-bold'>Saltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='w-48 h-20 border-2 border-gray-500 bg-blue-500 rounded-md flex items-center justify-center'
         
        >
          <Text className='color-white'>💰{'200'}</Text>
          <Text className='color-white font-bold'>Remover 2 incorrectas</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

 
 
  
  statusBar: {
    flexDirection: 'row',
  },
  status: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  
  

 
});

export default BibleQuiz;

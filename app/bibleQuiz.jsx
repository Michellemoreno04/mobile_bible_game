import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Pressable } from 'react-native';
import { AntDesign, FontAwesome5, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, updateDoc, onSnapshot, getDocs, collection,limit, query, where,addDoc, documentId } from 'firebase/firestore';
import useAuth from './authContext';
import { db } from '../components/firebase/firebaseConfig';



const BibleQuiz = () => {
const navigation = useNavigation();

  
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  
  

  const { user } = useAuth();

       // Obtén las preguntas de Firestore
  const fetchQuestions = async () => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const preguntasRespondidasSnapshot = await getDocs(collection(userDocRef, 'preguntasRespondidas'));
      const respuestasRespondidas = preguntasRespondidasSnapshot.docs.map(doc => doc.data().questionId); // Obtén los IDs de las preguntas respondidas
  
      // Filtra las preguntas no respondidas
      let q;
      if (respuestasRespondidas.length > 0) {
        q = query(
          collection(db, 'preguntas'),
          where(documentId(), 'not-in', respuestasRespondidas), // Filtrar por IDs de documento
          limit(3) // Limitar a 3 preguntas
        );
      } else {
        q = query(collection(db, 'preguntas'), limit(3));
      }
  
      const querySnapshot = await getDocs(q);
      const preguntas = querySnapshot.docs.map(doc => ({
        questionId: doc.id, // Agrega el ID del documento como questionId
        ...doc.data(),      // Incluye los datos del documento
      }));
  
      console.log('se obtuvieron las preguntas');
      setQuestions(preguntas);
    } catch (error) {
      console.error('Error al obtener las preguntas:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
    
  }, []);

  // Escucha en tiempo real para obtener los datos del usuario
  useEffect(() => {
    const userDocRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setUserInfo(doc.data());
      } else {
        console.error('El documento del usuario no existe');
      }
    });

    // Cleanup listener al desmontar el componente
    return () => unsubscribe();
  }, [user.uid]);

  const pregunta = questions[currentQuestion]?.question;
  const referencia = questions[currentQuestion]?.bibleReference;
  const textoBiblico = questions[currentQuestion]?.bibleText;
  const correcta = questions[currentQuestion]?.correctAnswer;
  const respuestas = questions[currentQuestion]?.answers || [];
  
  

// Función para marcar una pregunta como respondida en Firestore
  const marcarPreguntaRespondida = async (questionId) => {
    if (!questionId) {
      console.error('No se ha encontrado un ID de pregunta válido.');
      return;
    }
  
    const userDocRef = doc(db, 'users', user.uid);
    const preguntasRespondidasRef = collection(userDocRef, 'preguntasRespondidas');
  
    try {
      const docRef = await addDoc(preguntasRespondidasRef, {
        questionId: questionId,
        answeredAt: new Date(),
      });
      console.log('Pregunta respondida registrada en Firestore', docRef.id);
    } catch (error) {
      console.error('Error al agregar la pregunta respondida:', error);
    }
  };
  
  

  const comprobarRespuesta = async () => {
    if (respuestaSeleccionada === null) {
      Alert.alert('Por favor, selecciona una respuesta.');
      return;
    }


    if (respuestaSeleccionada === correcta ) {
      Alert.alert('¡Respuesta correcta!');

      // Marcar la pregunta como respondida en Firestore
     await marcarPreguntaRespondida(questions[currentQuestion]?.questionId); // Asegúrate de que `questionId` esté disponible
  
     
      if (currentQuestion < questions.length - 1) {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          exp: userInfo.exp + 15,
        });
        
        setCurrentQuestion(currentQuestion + 1);
        setRespuestaSeleccionada(null);
      } else {
        navigation.navigate('puntuacion');
      }
     
    } else {
      // Actualizar las vidas en Firestore si la respuesta es incorrecta
      const userDocRef = doc(db, 'users', user.uid);

      if (userInfo.vidas > 0) {
        try {
          await updateDoc(userDocRef, {
            vidas: userInfo.vidas - 1,
          })
          setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            vidas: prevUserInfo.vidas,
          }));
  
          
          if (currentQuestion < questions.length - 1) {
            Alert.alert('¡Respuesta incorrecta!');
         
            setCurrentQuestion(currentQuestion + 1);
            setRespuestaSeleccionada(null);
          } else {
            navigation.navigate('puntuacion');
          }
         
        } catch (error) {
          console.error('Error al actualizar las vidas:', error);
          Alert.alert('Error', 'No se pudieron actualizar las vidas.');
        }
      } else {
        Alert.alert('No tienes más vidas. El juego ha terminado.');
        

        navigation.navigate('puntuacion');
      }
    }
  }; 
  

  const skip = async () => {

    if (userInfo.monedas < 50) {
      Alert.alert('No tienes suficientes monedas para saltar la pregunta.');
      return;
    }

    if (currentQuestion < questions.length - 1) {
      const userDocRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(userDocRef, {
          monedas: userInfo.monedas - 50,
        });
        setCurrentQuestion(currentQuestion + 1);
        setRespuestaSeleccionada(null);
      } catch (error) {
        console.error('Error al actualizar las monedas:', error);
        Alert.alert('Error', 'No se pudieron actualizar las monedas.');
      }
    } else {
      Alert.alert('Has completado el quiz.');
      navigation.navigate('puntuacion');
    }
  };

  // Función para "remover dos respuestas incorrectas"
  const removeTwo = async () => {
    if (userInfo.monedas < 50) {
      Alert.alert('No tienes suficientes monedas para remover respuestas.');
      return;
    }

    // Filtrar las respuestas incorrectas
    const respuestasIncorrectas = respuestas.filter(respuesta => respuesta !== correcta);
    // Mantener una respuesta incorrecta y eliminar las demás
    const respuestasRestantes = respuestasIncorrectas.slice(0, 1);

    // Actualizar el estado con las respuestas restantes (correcta + una incorrecta)
    const nuevasRespuestas = [correcta, ...respuestasRestantes];

    // Actualizar el estado de las preguntas con las nuevas respuestas
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[currentQuestion] = {
        ...updatedQuestions[currentQuestion],
        respuestas: nuevasRespuestas,
      };
      return updatedQuestions;
    });

    // Descontar las monedas
    const userDocRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDocRef, {
        monedas: userInfo.monedas - 50,
      });
    } catch (error) {
      console.error('Error al actualizar las monedas:', error);
      Alert.alert('Error', 'No se pudieron actualizar las monedas.');
    }
  };


  const showTextoBiblico = () => {
    Alert.alert(referencia, textoBiblico, [{ text: 'Cerrar' }]);
  };

  return (
    <SafeAreaView>
    <View  className='w-full h-full bg-gray-300 flex items-center p-5'>
      <View className='w-full flex flex-row justify-between items-center '>
        <Link href="(tabs)" asChild>
        <TouchableOpacity className='p-2'  >
        <Octicons name="home" size={30} color="black" />
        </TouchableOpacity>
        </Link>
        <View style={styles.statusBar}>
        <AntDesign name="heart" size={24} color="red" />
        <Text style={styles.status}>{userInfo.vidas}</Text>
        <FontAwesome5 name="coins" size={24} color="yellow" />
        <Text style={styles.status}>{userInfo.monedas}</Text>
        </View>
      </View>
     
     <View style={styles.questionContainer} className='w-full h-[90%] rounded-md bg-white flex items-center p-5 '>
      <View style={styles.questionContainer} className='w-full h-52 bg-blue-600 rounded-md mb-5 mt-5 flex items-center justify-center p-5 '>
        <Text className='bg-blue-400 rounded-md p-2 absolute top-3 left-3'
        onPress={showTextoBiblico}
        >{referencia}</Text>
        <Text className='text-2xl'>{pregunta}</Text>
      </View>

      <View className='w-full flex flex-col items-center'>
        { respuestas.map ((respuestas, index) => (
          <TouchableOpacity
          key={index}
          className={`w-full h-16   rounded-md flex items-center justify-center m-1 ${
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
         onPress={removeTwo}
        >
          <Text className='color-white'>💰{'50'}</Text>
          <Text className='color-white font-bold'>Remover 2 incorrectas</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

 questionContainer: {
    
    borderRadius: 20,
  },
 
  
  statusBar: {
    flexDirection: 'row',
  },
  status: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  
  

 
});

export default BibleQuiz;

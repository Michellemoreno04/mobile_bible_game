import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Alert } from 'react-native';

/**
 * Maneja la racha diaria del usuario, actualizando la racha actual y la máxima alcanzada.
 * @param {string} userId - ID del usuario.
 * @param {function} setShowModalRacha - Función para mostrar el modal de racha.
 * @returns {Promise<void>}
 */
export const manejarRachaDiaria = async (userId, setShowModalRacha) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    // Obtener los datos del usuario desde Firestore
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('El documento del usuario no existe.');
    }

    const userData = userDoc.data();
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); 

    // Obtener la última fecha de racha y convertirla en un objeto Date
    const ultimaFecha = userData?.modalRachaShow?.toDate
      ? userData.modalRachaShow.toDate()
      : new Date(userData.modalRachaShow);

    
    let rachaActual = Number(userData?.Racha || 0);
    let rachaMaxima = Number(userData?.RachaMaxima || 0);

    if (!ultimaFecha || ultimaFecha < hoy) {
      // Incrementar racha si se estudió ayer
      const ayer = new Date(hoy);
      ayer.setDate(hoy.getDate() - 1); 

      if (ultimaFecha && ultimaFecha.getTime() === ayer.getTime()) {
        // Incrementar racha si se estudió ayer
        rachaActual += 1;
        if (rachaActual > rachaMaxima) {
          rachaMaxima = rachaActual; // Actualizar racha máxima
        }
      } else {
        // Reiniciar racha si no se estudió ayer
        rachaActual = 1;
      }

      // Muestra el modal de racha porque es un día nuevo
      setShowModalRacha(true);

      // Actualizar los datos en Firestore
      await updateDoc(userDocRef, {
        modalRachaShow: hoy.toISOString(), 
        Racha: rachaActual,
        RachaMaxima: rachaMaxima,
      });

      console.log('La racha diaria ha sido actualizada correctamente.');
    } else {
      console.log('No es necesario actualizar la racha.');
    }
  } catch (error) {
    console.error('Error al manejar la racha diaria:', error);
    Alert.alert('Error', 'No se pudo verificar la racha diaria.');
  }
};

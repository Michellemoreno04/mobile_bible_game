import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Share,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { db } from "../../components/firebase/firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  query,
  limit,
  where,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import useAuth from "@/app/authContext";
import * as Clipboard from "expo-clipboard";
import { useNavigation } from "@react-navigation/native";

const VersiculosDiarios = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [versiculo, setVersiculo] = useState(null);
  const [versiculoGuardado, setVersiculoGuardado] = useState(false);

  const userId = user?.uid;


  // Verifica si el versículo está guardado en favoritos
  useEffect(() => {
    const verificarVersiculoFavorito = async (versiculoId) => {
      if (!versiculoId) return; // Evita procesar si el ID no está definido

      try {
        const versiculoFavoritoRef = doc(
          db,
          `users/${userId}/versiculosFavoritos`,
          versiculoId
        );
        const docSnapshot = await getDoc(versiculoFavoritoRef);
        setVersiculoGuardado(docSnapshot.exists());
      } catch (error) {
        console.error("Error verificando versículo favorito:", error);
      }
    };
    navigation.addListener("focus", () => {
      verificarVersiculoFavorito(versiculo?.id);
    });
  }, [versiculo?.id]);

 
  // Obtener un versículo diario
  useEffect(() => {
    if (!userId) return;
    const fetchVersiculoDelDia = async () => {
      
      try {
        const versiculoDocRef = doc(
          db,
          `users/${userId}/versiculoDelDia/current`
        );
        const versiculoDoc = await getDoc(versiculoDocRef);

        if (versiculoDoc.exists()) {
          const data = versiculoDoc.data();
          const storedTimestamp = data.timestamp.toDate();
          const currentTime = new Date();
          const timeDifference = currentTime - storedTimestamp;

          if (timeDifference < 24 * 60 * 60 * 1000) { 
            setVersiculo(data.versiculo);
            return;
          }
        }

        const versiculosVistosRef = collection(
          db,
          `users/${user.uid}/versiculosVistos`
        );
        const vistosSnapshot = await getDocs(versiculosVistosRef);
        const vistos = vistosSnapshot.docs.map((doc) => doc.id);

        const versiculosRef = collection(db, "versiculosDiarios");
        const q =
          vistos.length > 0 
            ? query(
                versiculosRef,
                where("__name__", "not-in", vistos),
                limit(1)
              )
            : query(versiculosRef, limit(1));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const nuevoVersiculo = snapshot.docs[0];
          const data = { id: nuevoVersiculo.id, ...nuevoVersiculo.data() };
          setVersiculo(data);

          const vistoDocRef = doc(
            db,
            `users/${userId}/versiculosVistos`,
            nuevoVersiculo.id
          );
          await setDoc(vistoDocRef, { timestamp: serverTimestamp() });

          await setDoc(versiculoDocRef, {
            versiculo: data,
            timestamp: serverTimestamp(),
          });
        } else {
          console.log("No hay más versículos disponibles.");
        }
      } catch (error) {
        console.error("Error obteniendo los versículos diarios:", error);
      }
    };

    fetchVersiculoDelDia();
  }, [userId]);

  const copiar = async () => {
    const textoCompleto = `${versiculo.texto} \n\n ${versiculo.versiculo}`;
    await Clipboard.setStringAsync(textoCompleto);
    Alert.alert(" ", "Texto copiado al portapapeles");
  };

  const share = async () => {
    try {
      await Share.share({
        message: versiculo?.texto,
      });
    } catch (error) {
      console.error("Error al compartir:", error.message);
    }
  };

  const guardar = async () => {
    try {
      const versiculoFavoritoRef = doc(
        db,
        `users/${user.uid}/versiculosFavoritos`,
        versiculo.id
      );
      const documento = {
        fecha: new Date().toISOString(),
        texto: versiculo.texto,
        versiculo: versiculo.versiculo,
        timestamp: serverTimestamp(),
      };

      const docSnapshot = await getDoc(versiculoFavoritoRef);
      if (docSnapshot.exists()) {
        Alert.alert(" ", "Este versículo ya está en tus favoritos");
      } else {
        await setDoc(versiculoFavoritoRef, documento);
        Alert.alert(" ", "Versículo guardado con éxito");
      }

      setVersiculoGuardado(true);
    } catch (error) {
      console.error("Error guardando versículo:", error);
      Alert.alert("Error", "No se pudo guardar el versículo");
    }
  };

 

  return (
    <View style={styles.verseContainer}>
      <Text style={styles.referencia}>{versiculo?.texto}</Text>
      <View style={styles.cita}>
        <Text className="text-white" >{versiculo?.versiculo}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <Pressable style={styles.actionButton} onPress={copiar}>
          <Feather name="copy" size={24} color="white" />
          <Text className="text-white">Copiar</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={share}>
          <Feather name="share-2" size={24} color="white" />
          <Text className="text-white">Compartir</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={guardar}>
          <AntDesign
            name={versiculoGuardado ? "heart" : "hearto"}
            size={24}
            color={versiculoGuardado ? "red" : "white"}
          />
          <Text className="text-white">Favorito</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  verseContainer: { 
    width: "100%",
    height: 250,
    
    borderRadius: 20,
    padding: 16,
    //backgroundColor: "skyblue",
   // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    justifyContent:'space-around', // Ajusta el espacio entre los elementos
  },
  referencia: { 
    fontSize: 24,
   fontWeight: "bold",
  color: "white",
  fontFamily: "serif",
  },
  cita: {
    width: "100%",
    fontSize: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 16,
    marginTop: 16,
    

  },
  actionButton: {
   alignItems: "center"
  
  
  },
});

export default VersiculosDiarios;

import { View, Text, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Profile() {
  const insignias = ['plata', 'oro', 'diamante', 'platino'];
  const librosAprendidos = ['libro 1', 'libro 2', 'libro 3', 'libro 4', 'libro 5', 'libro 6'];

  return (
    
    <ScrollView className="w-full h-full bg-blue-400">
      <SafeAreaView>
      <View className="w-[90%] h-64 bg-blue-500 rounded-md flex items-center justify-center self-center mt-5">
        <Ionicons name="person-circle-sharp" size={100} color="black" />
        <Text className="text-3xl font-bold text-white">Nombre del usuario</Text>
        <View className="w-full flex flex-row justify-between p-5">
          <View >
            <Text className="text-xl font-bold text-white">15</Text>
            <Text className="text-2xl font-bold text-white">Días</Text>
          </View>
          <View >
            <Text className="text-xl font-bold text-white">200</Text>
            <Text className="text-2xl font-bold text-white">Score</Text>
          </View>
          <View>
            <Text className="text-xl font-bold text-white">500</Text>
            <Text className="text-2xl font-bold text-white">Coins</Text>
          </View>
        </View>
      </View>

      <View className="w-full p-5">
        <Text className="text-3xl font-bold text-black">Insignias</Text>
        <View className="w-full flex flex-row flex-wrap">
          {insignias.map((insignia, index) => (
            <View
              key={index}
              className="w-40 h-10 p-2 m-1 bg-gray-200 rounded-full flex items-center justify-center"
            >
              <Text>{insignia}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="w-full p-5">
        <Text className="text-3xl font-bold text-black">Libros aprendidos</Text>
        <View className="w-full flex flex-row flex-wrap">
          {librosAprendidos.map((libro, index) => (
            <View
              key={index}
              className="w-full h-10 p-2 m-1 bg-gray-200 rounded-md flex items-center justify-center"
            >
              <Text>{libro}</Text>
            </View>
          ))}
        </View>
      </View>
      </SafeAreaView>
    </ScrollView>
   
  );
}

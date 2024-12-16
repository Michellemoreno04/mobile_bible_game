import { View, Text,Image,Pressable } from 'react-native'
import { router,Link } from 'expo-router'
import { MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



export default function Puntuacion() {

    return (
        <View className="w-full h-full   flex items-center justify-center">
            <Text >New award</Text>
            <Text className='text-3xl font-bold' >Platinium</Text>
            <Text >Sigues mateniendo tus 15 dias de racha</Text>

               <View className='w-62 h-62 flex items-center justify-center border-2 border-black rounded-full m-5'>
               <MaterialIcons name="workspace-premium" size={150} color="blue" className='p-5' />
               </View>

            <View className='w-full flex flex-row items-center justify-around'>
                <View className='flex flex-col items-center justify-center' >
                 <Text>+ 400 
                 <FontAwesome5 name="coins" size={24} color="yellow"  />
                 </Text>

                 <Text>Monedas</Text>
                </View>

                <View className='flex flex-col items-center justify-center' >
                 <Text>+ 100 
                 <Feather name="award" size={24} color="blue" />
                 </Text>
                 <Text>Exp</Text>
                </View>
                 
            </View>

<View>
    <Text>8 preguntas de 10</Text>
    <Text>----------------------------------</Text>
    <Pressable
     className='w-40 h-10 flex flex-rows justify-center items-center bg-blue-700 hover:bg-blue-600 rounded'
     >
        <Text>Continuar</Text>
    </Pressable>
</View>

        </View>
    );
}
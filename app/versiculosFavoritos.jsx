import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function VersiculosFavoritos() {

const versiculosDiario = [
  {
    referencia: "Juan 3:16",
    versiculo: "Porque de tal manera amó Dios al mundo, que dio a su Hijo unigénito, para que todo aquel que cree en Él, no se pierda, mas tenga vida eterna.",
    fecha: "27/12/2024",
                       

  },
  {
    referencia: "Juan 3:16",
    versiculo: "Porque de tal manera amó Dios al mundo, que dio a su Hijo unigénito, para que todo aquel que cree en Él, no se pierda, mas tenga vida eterna.",
    fecha: "27/12/2024",
  },
  ]

  return (
    <ScrollView>
         <View className="w-full h-full p-2">
        
          {

            versiculosDiario.map((versiculo, index) => (
              <View key={index} className="w-full flex flex-col gap-2 bg-slate-300 mb-5 p-5 rounded-lg">
                <Text className="text-lg font-bold">{versiculo.referencia}</Text>
                <Text className="text-lg color-black">{versiculo.versiculo}</Text>
                <Text className="text-sm text-gray-500">{versiculo.fecha}</Text>
              </View>
            ))
          }
         
         </View>
     
    </ScrollView>
  )
}
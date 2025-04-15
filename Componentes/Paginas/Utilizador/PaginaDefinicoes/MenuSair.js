import React from "react"
import { fazerLogout } from "../../../Global"
import { Text, TouchableHighlight, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { estilos } from "../../../estilos"


export function MenuSair() {
  const navegacao = useNavigation()
  
  return (
    <TouchableHighlight 
      onPress={() => {
        fazerLogout(navegacao)
      }}
    >
      <Text>Sair</Text>
    </TouchableHighlight>
  )
}
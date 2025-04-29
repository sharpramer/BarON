import React from "react"
import { fazerLogout } from "../../../Global"
import { Text, TouchableHighlight, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { estilos } from "../../../estilos"
import { estilosMenus } from "./estilos/estilosMenus"

export function MenuSair() {
  const navegacao = useNavigation()
  
  return (
    <TouchableHighlight 
      style={estilosMenus.tituloMenu}
      onPress={() => {
        fazerLogout(navegacao)
      }}
    >
      <Text>Sair</Text>
    </TouchableHighlight>
  )
}
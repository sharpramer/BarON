import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import Utilizador from "../../../Global";
import { MenuConta } from "./MenuConta";
import { MenuAparencia } from "./MenuAparencia";
import { MenuSobre } from "./MenuSobre";
import { MenuSair } from "./MenuSair";

export default function PaginaDefinicoes() { // Página definições utilizador
  const [nomeUtilizador, setNomeUtilizador] = useState('')

  useState(() => {
    setNomeUtilizador(Utilizador.nome)
  }, [])

  return (
    <SafeAreaView>
      {/* Conteiner cabeçalho */}
      <View>
        <Image
          source={require('../../../img/utilizador.png')}
        />
        <Text>Olá { nomeUtilizador }</Text>
        <Image
          source={require('../../../img/buscar.png')}
        />
      </View>

      <MenuConta/>

      <MenuAparencia/>
      
      <MenuSobre/>
      
      <MenuSair/>
      
    </SafeAreaView>
  );
}

export const estilos = StyleSheet.create({
  btnFecharModal:{

  }
})
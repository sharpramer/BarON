import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import Utilizador from "../../../Global";
import { MenuConta } from "./MenuConta";
import { MenuAparencia } from "./MenuAparencia";
import { MenuSobre } from "./MenuSobre";
import { MenuSair } from "./MenuSair";

export default function PaginaDefinicoes() { // Página definições utilizador
  const [nomeUtilizador, setNomeUtilizador] = useState('')

  return (
    <SafeAreaView>
      <Image
        source={require('../../../img/buscar.png')}
      />

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
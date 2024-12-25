import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuConta } from "./MenuConta";
import { MenuAparencia } from "./MenuAparencia";
import { MenuSobre } from "./MenuSobre";
import { MenuSair } from "./MenuSair";

export default function PaginaDefinicoes() { // Página definições utilizador
  return (
    <SafeAreaView>

      <MenuConta/>

      <MenuAparencia/>
      
      <MenuSobre/>
      
      <MenuSair/>
      
    </SafeAreaView>
  );
}
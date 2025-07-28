import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuConta } from "./MenuConta";
import { MenuSobre } from "./MenuSobre";
import { MenuSair } from "./MenuSair";
import { MenuSuporte } from "./MenuSuporte";

export default function PaginaDefinicoes() { // Página definições utilizador
  return (
    <SafeAreaView>

      <MenuConta/>

      <MenuSobre/>

      <MenuSuporte/>
      
      <MenuSair/>
      
    </SafeAreaView>
  );
}
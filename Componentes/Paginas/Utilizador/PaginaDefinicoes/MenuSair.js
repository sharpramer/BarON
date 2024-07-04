import React from "react";
import { Text, TouchableHighlight } from "react-native";

export function MenuSair() {
  return (
    /* Botão menu definições Sair */
    <TouchableHighlight
      onPress={() => { console.log("sair"); }}
    >
      <Text>Sair</Text>
    </TouchableHighlight>
  );
}

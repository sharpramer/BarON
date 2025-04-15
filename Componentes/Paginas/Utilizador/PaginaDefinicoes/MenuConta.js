import React, { useState } from "react"
import { View, Text, TouchableHighlight, Modal, StyleSheet } from "react-native"
import { estilos } from "../../../estilos"
import MenuEditar from "./MenuEditar"
import MenuRelatorioMensal from "./MenuRelatorioMensal"
import MenuEliminar from "./MenuEliminar"

export function MenuConta() {
  const [modalContaVisibilidade, setModalContaVisibilidade] = useState(false)
  
  return (
    <View>
      {/* Botão menu definições conta */}
      <TouchableHighlight
        onPress={() => {
          setModalContaVisibilidade(true)
        }}
      >
        <Text>Conta</Text>
      </TouchableHighlight>

      {/* Modal definições conta  */}
      <Modal
        visible={modalContaVisibilidade}
        onRequestClose={() => setModalContaVisibilidade}
      >
        {/* Botão fechar modal */}
        <TouchableHighlight
          style={estilos.btnFechar}
          onPress={() => {
            setModalContaVisibilidade(false)
          }}
        >
          <Text>X</Text>
        </TouchableHighlight>

        <MenuEditar/>
        <MenuRelatorioMensal />
        <MenuEliminar />
      </Modal>
    </View>
  );
}
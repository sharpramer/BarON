import React, { useState } from "react";
import { View, TouchableHighlight, Modal, Text, StyleSheet } from "react-native";
import { estilos } from "../../../estilos"
import MenuAlterarEmail from "./MenuAlterarEmail";
import MenuAlterarPasse from "./MenuAlterarPasse";

export default function MenuEditar() {
  const [modalEditarVisibilidade, setModalEditarVisibilidade] = useState(false);

  return (
    // Conteiner menu editar
    <View>
      {/* Botão menu editar */}
      <TouchableHighlight
        onPress={() => {
          setModalEditarVisibilidade(true);
        }}
      >
        <Text>Editar</Text>
      </TouchableHighlight>

      {/* Modal menu editar */}
      <Modal
        visible={modalEditarVisibilidade}
        onRequestClose={setModalEditarVisibilidade}
      >
          {/* Botão fechar modal menu editar */}
          <TouchableHighlight
            style={estilos.btnFecharModal}
            onPress={() => {
              setModalEditarVisibilidade(false);
            }}
            >
            <Text>X</Text>
          </TouchableHighlight>
          <MenuAlterarEmail/>
          <MenuAlterarPasse/>
      </Modal>
    </View>
  )
}
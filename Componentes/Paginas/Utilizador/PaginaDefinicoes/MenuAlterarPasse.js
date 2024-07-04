import React, { useState } from "react";
import { View, TouchableHighlight, Modal, Text } from "react-native";
import { estilos } from "../../../Global"

export default function MenuAlterarPasse() {
  const [modalAlterarPasseVisibilidade, setModalAlterarPasseVisibilidade] = useState(false);
  
  return (
    <View>
        {/* Botão alterar passe */}
        <TouchableHighlight
          style={estilos.btnFecharModal}
          onPress={() => { setModalAlterarPasseVisibilidade(true) }}
        >
          <Text>Alterar passe</Text>
        </TouchableHighlight>

        <Modal 
          visible={modalAlterarPasseVisibilidade}
          onRequestClose={setModalAlterarPasseVisibilidade}
        >
          {/* Botão fechar modal menu alterar passe */}
          <TouchableHighlight
            style={estilos.btnFecharModal}
            onPress={() => {
              setModalAlterarPasseVisibilidade(false);
            }}
          >
            <Text>X</Text>
          </TouchableHighlight>
        </Modal>
      </View>
    );
}
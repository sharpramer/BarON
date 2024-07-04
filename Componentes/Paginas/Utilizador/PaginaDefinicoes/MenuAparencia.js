import React, { useState } from "react";
import { View, Text, TouchableHighlight, Modal } from "react-native";

export function MenuAparencia() {
  const [modalAparenciaVisibilidade, setModalAparenciaVisibilidade] = useState(false);

  return (
    <View>
      {/* Botão menu definições aparência */}
      <TouchableHighlight
        onPress={() => {
          setModalAparenciaVisibilidade(true);
        }}
      >
        <Text>Aparência</Text>
      </TouchableHighlight>

      {/* Submenu definições aparência */}
      <Modal
        visible={modalAparenciaVisibilidade}
        onRequestClose={() => setModalAparenciaVisibilidade}
      >
        {/* Botão fechar modal */}
        <TouchableHighlight
          onPress={() => {
            setModalAparenciaVisibilidade(false);
          }}
        >
          <Text>X</Text>
        </TouchableHighlight>
      </Modal>
    </View>
  );
}

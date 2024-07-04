import React, { useState } from "react";
import { View, Text, TouchableHighlight, Modal } from "react-native";

export function MenuSobre() {
  const [modalSobreVisibilidade, setModalSobreVisibilidade] = useState(false);

  return (
    <View>
      {/* Botão menu definições Sobre */}
      <TouchableHighlight
        onPress={() => {
          setModalSobreVisibilidade(true);
        }}
      >
        <Text>Sobre</Text>
      </TouchableHighlight>

      {/* Modal definições Sobre */}
      <Modal
        visible={modalSobreVisibilidade}
        onRequestClose={() => setModalSobreVisibilidade}
      >
        {/* Botão fechar modal */}
        <TouchableHighlight
          onPress={() => {
            setModalSobreVisibilidade(false);
          }}
        >
          <Text>X</Text>
        </TouchableHighlight>
      </Modal>
    </View>
  );
}

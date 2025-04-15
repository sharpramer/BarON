import React, { useState } from "react";
import { View, Text, TouchableHighlight, Modal } from "react-native";
import { estilos } from "../../../estilos";
import MenuTermosUtilizacao from "./MenuTermosUtilizacao";
import MenuPoliticaPrivacidade from "./MenuPoliticaPrivacidade";

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
          style={estilos.btnFechar}
          onPress={() => {
            setModalSobreVisibilidade(false);
          }}
          >
          <Text>X</Text>
        </TouchableHighlight>

        <MenuTermosUtilizacao/>
        <MenuPoliticaPrivacidade/>
      </Modal>
    </View>
  );
}

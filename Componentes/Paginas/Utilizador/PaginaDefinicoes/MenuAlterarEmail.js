import React, { useEffect, useState } from "react";
import { View, TouchableHighlight, Modal, Text } from "react-native";
import { estilos } from "../../../Global"

export default function MenuAlterarEmail() {
  const [modalAlterarEmailVisibilidade, setModalAlterarEmailVisibilidade] = useState(false);
    return (
      <View>
        {/* Botão alterar email */}
        <TouchableHighlight
          style={estilos.btnFecharModal}
          onPress={() => { setModalAlterarEmailVisibilidade(true) }}
        >
          <Text>Alterar email</Text>
        </TouchableHighlight>

        

        <Modal 
          visible={modalAlterarEmailVisibilidade}
          onRequestClose={setModalAlterarEmailVisibilidade}
        >
          {/* Botão fechar modal menu alterar email */}
          <TouchableHighlight
            style={estilos.btnFecharModal}
            onPress={() => {
              setModalAlterarEmailVisibilidade(false);
            }}
          >
            <Text>X</Text>
          </TouchableHighlight>
        </Modal>
      </View>
    );
}
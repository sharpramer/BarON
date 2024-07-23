import React, { useState } from "react";
import { View, TouchableHighlight, Modal, Text, TextInput } from "react-native";
import Utilizador from "../../../Global";
import { estilos } from "../../../estilos"

export default function MenuAlterarEmail() {
  const [modalAlterarEmailVisibilidade, setModalAlterarEmailVisibilidade] = useState(false);
  const [novoEmailUtilizador, setNovoEmailUtilizador] = useState('');
  const [emailUtilizador, setEmailUtilizador] = useState('');

  return (
    <View>
      {/* Botão alterar email */}
      <TouchableHighlight
        onPress={() => setModalAlterarEmailVisibilidade(true)}
      >
        <Text>Alterar email</Text>
      </TouchableHighlight>

      <Modal
        visible={modalAlterarEmailVisibilidade}
        onRequestClose={() => setModalAlterarEmailVisibilidade(false)}
      >
        {/* Botão fechar modal menu alterar email */}
        <TouchableHighlight
          style={estilos.btnFecharModal}
          onPress={() => setModalAlterarEmailVisibilidade(false)}
        >
          <Text>X</Text>
        </TouchableHighlight>

        <View style={estilos.conteiner}>
          {/* Caixa de texto Codigo utilizador */}
          <TextInput
            style={estilos.cx}
            onChangeText={(texto) => setEmailUtilizador(texto)}
            placeholder="Email antigo"
            placeholderTextColor={"black"}
            value={emailUtilizador}
          />
          <View style={estilos.separadorCx}></View>

          <TextInput
            style={estilos.cx}
            onChangeText={(texto) => setNovoEmailUtilizador(texto)}
            placeholder="Email novo"
            placeholderTextColor={"black"}
            value={novoEmailUtilizador}
          />
          <View style={estilos.separadorCx}></View>

          <TouchableHighlight
            onPress={() => { Utilizador.email = novoEmailUtilizador, alert("Palavra-Passe alterada com sucesso!") }}
          >
            <Text>Guardar</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    </View>
  );
}

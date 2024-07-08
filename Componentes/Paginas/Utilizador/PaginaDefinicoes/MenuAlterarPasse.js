import React, { useState } from "react";
import { View, TouchableHighlight, Modal, Text, TextInput } from "react-native";
import { estilos } from "../../../Global"

export default function MenuAlterarPasse() {
  const [modalAlterarPasseVisibilidade, setModalAlterarPasseVisibilidade] = useState(false);
  const [novaPalavraPasseUtilizador, setNovaPalavraPasseUtilizador] = useState('');
  const [passeUtilizador, setPalavraPasseUtilizador] = useState('');
  
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

          <View style={estilos.conteiner}>
          {/* Caixa de texto Codigo utilizador */}
          <TextInput
            style={estilos.cx}
            onChangeText={(texto) => setPalavraPasseUtilizador(texto)}
            placeholder="Palavra-Passe antiga"
            placeholderTextColor={"black"}
            value={passeUtilizador}
          />
          <View style={estilos.separadorCx}></View>

          <TextInput
            style={estilos.cx}
            onChangeText={(texto) => setNovaPalavraPasseUtilizador(texto)}
            placeholder="Palavra-Passe nova"
            placeholderTextColor={"black"}
            value={novaPalavraPasseUtilizador}
          />
          <View style={estilos.separadorCx}></View>

          <TouchableHighlight
            onPress={() => { alert("Palavra-Passe alterada com sucesso!") }}
          >
            <Text>Guardar</Text>
          </TouchableHighlight>
        </View>
        </Modal>
      </View>
  );
}
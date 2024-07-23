import React, { useState } from "react";
import { View, Text, TouchableHighlight, Modal } from "react-native"
import Utilizador, { MudarAparenciaConteinerUtilizador, MudarAparenciaTextoUtilizador } from "../../../Global";

export function MenuAparencia() {
  const [modalAparenciaVisibilidade, setModalAparenciaVisibilidade] = useState(false)
  const [aparencia, setAparencia] = useState(Utilizador.aparencia)

  const mudarAparencia = novaAparencia => {
    Utilizador.aparencia = novaAparencia
    setAparencia(novaAparencia)
  }

  return (
    <View>
      {/* Botão menu definições aparência */}
      <TouchableHighlight
        onPress={() => {
          setModalAparenciaVisibilidade(true)
        }}
      >
        <Text>Aparência</Text>
      </TouchableHighlight>

      {/* Modal aparência */}
      <Modal
        visible={modalAparenciaVisibilidade}
        onRequestClose={() => setModalAparenciaVisibilidade}
      >
        <View style={ MudarAparenciaConteinerUtilizador() }>
          {/* Botão fechar modal */}
          <TouchableHighlight
            onPress={() => {
              setModalAparenciaVisibilidade(false)
            }}
          >
            <Text style={MudarAparenciaTextoUtilizador(aparencia)}>X</Text>
          </TouchableHighlight>

          {/* Botão aparência claro */}
          <TouchableHighlight 
            onPress={() => { mudarAparencia('claro') }}
          >
            <Text style={MudarAparenciaTextoUtilizador(aparencia)}>Claro</Text>
          </TouchableHighlight>
          {/* Botão aparência escuro */}
          <TouchableHighlight
            onPress={() => { mudarAparencia('escuro') }}
          >
            <Text style={MudarAparenciaTextoUtilizador(aparencia)}>Escuro</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    </View>
  )
}
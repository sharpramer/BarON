import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight, StyleSheet, Image, SafeAreaView, Modal } from "react-native";
import Utilizador from "../../Global";

function MenuConta() {
  const [modalContaVisibilidade, setModalContaVisibilidade] = useState(false)

  return(
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
        onRequestClose={() => setModalContaVisibilidade(false)}
      >
        <TouchableHighlight
          onPress={() => {
            setModalContaVisibilidade(false)
          }}
        >
          <Text>X</Text>
        </TouchableHighlight>
      </Modal>
    </View>
  )
}

function MenuAparencia() { // Menu aparência
  const [modalAparenciaVisibilidade, setModalAparenciaVisibilidade] = useState(false)

  return(
    <View>
      {/* Botão menu definições aparência */}
      <TouchableHighlight
        onPress={() => {
          setModalAparenciaVisibilidade(true)
        }}
      >
        <Text>Aparência</Text>
      </TouchableHighlight>

      {/* Submenu definições aparência */}
      <Modal
        visible={modalAparenciaVisibilidade}
        onRequestClose={() => setModalAparenciaVisibilidade(false)}
      >
        <TouchableHighlight
          onPress={() => {
            setModalAparenciaVisibilidade(false)
          }}
        >
          <Text>X</Text>
        </TouchableHighlight>
      </Modal>
    </View>
  )
}

function MenuSobre() {
  const [modalSobreVisibilidade, setModalSobreVisibilidade] = useState(false)

  return(
    <View>
      {/* Botão menu definições Sobre */}
      <TouchableHighlight
        onPress={() => {
          setModalSobreVisibilidade(true)
        }}
      >
        <Text>Sobre</Text>
      </TouchableHighlight>

      {/* Modal definições Sobre */}
      <Modal
        visible={modalSobreVisibilidade}
        onRequestClose={() => setModalSobreVisibilidade(false)}
      >
        <TouchableHighlight
          onPress={() => {
            setModalSobreVisibilidade(false)
          }}
        >
          <Text>X</Text>
        </TouchableHighlight>
      </Modal>
    </View>
  )
}

function MenuSair() {
  return(
    /* Botão menu definições Sobre */
    <TouchableHighlight
      onPress={() => {console.log("sair")}}
    >
      <Text>Sobre</Text>
    </TouchableHighlight>
  )
}

export default function PaginaDefinicoes() { // Página definições utilizador
  const [nomeUtilizador, setNomeUtilizador] = useState('')

  useState(() => {
    setNomeUtilizador(Utilizador.nome)
  }, [])

  return (
    <SafeAreaView>
      {/* Conteiner cabeçalho */}
      <View>
        <Image
          style={estilos.imgUtilizador}
          source={require('../../img/utilizador.png')}
        />
        <Text>Olá { nomeUtilizador }</Text>
        <Image
          source={require('../../img/buscar.png')}
        />
      </View>

      <MenuConta/>

      <MenuAparencia/>
      
      <MenuSobre/>
      
      <MenuSair/>
      
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  imgUtilizador:{

  }
})
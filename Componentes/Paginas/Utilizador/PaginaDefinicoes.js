import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight, StyleSheet, Image, SafeAreaView, Modal } from "react-native";
import Utilizador from "../../Global";

function MenuConta() {
  const [modalContaVisibilidade, setModalContaVisibilidade] = useState(false)
  const [modalEditarVisibilidade, setModalEditarVisibilidade] = useState(false)
  const [modalRelatorioMensalVisibilidade, setModalRelatorioMensalVisibilidade] = useState(false)
  const [modalEliminarVisibilidade, setModalEliminarVisibilidade] = useState(false)
  
  function MenuEditar() { // Menu editar
    return(
      <View>
        {/* Botão menu editar */}
        <TouchableHighlight
          onPress={() => {
            setModalEditarVisibilidade(true)
          }}
          >
          <Text>Editar</Text>
        </TouchableHighlight>
        
        <Modal
          visible={modalEditarVisibilidade}
          onRequestClose={setModalEditarVisibilidade}
        >
          {/* Botão fechar modal menu editar */}
          <TouchableHighlight
            style={estilos.btnFecharModal}
            onPress={() => {
              setModalEditarVisibilidade(false)
            }}
            >
            <Text>X</Text>
          </TouchableHighlight>
        </Modal>
      </View>
    )
  }

  function MenuRelatorioMensal() { // Menu relatório mensal 
    return(
      <View>
        {/* Botão menu relatório mensal */}
        <TouchableHighlight
          onPress={() => {
            setModalRelatorioMensalVisibilidade(true)
          }}
          >
          <Text>Relatório mensal</Text>
        </TouchableHighlight>
        
        <Modal
          visible={modalRelatorioMensalVisibilidade}
          onRequestClose={setModalRelatorioMensalVisibilidade}
          >
          {/* Botão fechar modal menu relatório mensal */}
          <TouchableHighlight
            style={estilos.btnFecharModal}
            onPress={() => {
              setModalRelatorioMensalVisibilidade(false)
            }}
            >
            <Text>X</Text>
          </TouchableHighlight>
          
        </Modal>
      </View>
    )
  }

  function MenuEliminar() { // Menu eliminar 
    return(
      <View>
        {/* Botão menu eliminar */}
        <TouchableHighlight
          onPress={() => {
            setModalEliminarVisibilidade(true)
          }}
          >
          <Text>Eliminar</Text>
        </TouchableHighlight>
        
        <Modal
          visible={modalEliminarVisibilidade}
          onRequestClose={setModalEliminarVisibilidade}
          >
          {/* Botão fechar modal menu eliminar */}
          <TouchableHighlight
            style={estilos.btnFecharModal}
            onPress={() => {
              setModalEliminarVisibilidade(false)
            }}
            >
            <Text>X</Text>
          </TouchableHighlight>
          
        </Modal>
      </View>
    )
  }
  
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
        onRequestClose={() => setModalContaVisibilidade}
      >
        {/* Botão fechar modal */}
        <TouchableHighlight
          style={estilos.btnFecharModal}
          onPress={() => {
            setModalContaVisibilidade(false)
          }}
        >
          <Text>X</Text>
        </TouchableHighlight>
        
        <MenuEditar modalVisibilidade={modalEditarVisibilidade}/>
        <MenuRelatorioMensal/>
        <MenuEliminar/>
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
        onRequestClose={() => setModalAparenciaVisibilidade}
      >
        {/* Botão fechar modal */}
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
        onRequestClose={() => setModalSobreVisibilidade}
      >
        {/* Botão fechar modal */}
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
    /* Botão menu definições Sair */
    <TouchableHighlight
      onPress={() => {console.log("sair")}}
    >
      <Text>Sair</Text>
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
  btnFecharModal:{

  }
})
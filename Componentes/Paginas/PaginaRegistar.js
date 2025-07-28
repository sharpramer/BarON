import React, { useState } from "react";
import { View, TextInput, TouchableHighlight, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import ModalTermosUtilizacao from "../Termos/TermosUtilizacao/ModalTermosUtilizacao";
import ModalPoliticaPrivacidade from "../Termos/PoliticaPrivacidade/ModalPoliticaPrivacidade";
import { estilos } from "../estilos";

export default function PaginaRegistar() {
  const [opRegistar, setOpRegistar] = useState('Utilizador')
  const [utilizador, setUtilizador] = useState({
    nome: '',
    dataNascimento: '',
    email: '',
    passe: '',
    isTermosAceitos: false
  })

  const [funcionario, setFuncionario] = useState({
    nome: '',
    dataNascimento: '',
    email: '',
    passe: '',
    isTermosAceitos: false
  })

  const [modalTermosUtilizacao, setModalTermosUtilizacao] = useState({
    tipoConta: undefined,
    visibilidade: false
  })
  const [modalPoliticaPrivacidade, setModalPoliticaPrivacidade] = useState({
    tipoConta: undefined,
    visibilidade: false
  })
  
  return (
    <View style={estilosPaginaRegistar.conteinerPaginaRegistar}> 
      <View style={estilosPaginaRegistar.opRegistarConteiner}>
        {/* Botão opção de registar aluno */}
        <TouchableHighlight
          style={[
            estilosPaginaRegistar.btnOpRegistar, {
              backgroundColor: opRegistar === 'Utilizador' ? 'blue' : 'white'
            }
          ]}
          onPress={() => {
            setOpRegistar('Utilizador')
          }}
        >
          <Text>Usuário</Text>
        </TouchableHighlight>

        {/* Botão opção de registar funcionário */}
        <TouchableHighlight
          style={[
            estilosPaginaRegistar.btnOpRegistar, { 
              backgroundColor: opRegistar === 'Funcionario' ? 'blue' : 'white' 
            }
          ]}
          onPress={() => { 
            setOpRegistar('Funcionario') 
          }}
        >
          <Text>Funcionário</Text>
        </TouchableHighlight>
        
      </View>

      { opRegistar === 'Utilizador' ?
        <View style={estilosPaginaRegistar.conteinerRegistar}>
          {/* Caixa de texto email do aluno */}
          <TextInput
            style={estilos.cx}
            onChangeText={txtEmail => {
              setUtilizador({ ...utilizador, email: txtEmail })
            }}
            placeholder="Email"
            placeholderTextColor={"black"}
            value={utilizador.email}
          />

          <View style={estilos.separadorCx}></View>

          {/* Caixa de texto passe do aluno */}
          <TextInput
            style={estilos.cx}
            onChangeText={txtPasse => {
              setUtilizador({ ...utilizador, passe: txtPasse })
            }}
            placeholder="Senha"
            placeholderTextColor={"black"}
            secureTextEntry={true}
            value={utilizador.passe}
          />

          <View style={estilos.separadorCx}></View>

          {/* Caixa de texto nome do aluno */}
          <TextInput
            style={estilos.cx}
            onChangeText={txtNome => {
              setUtilizador({ ...utilizador, nome: txtNome })
            }}
            placeholder="Nome"
            placeholderTextColor={"black"}
            value={utilizador.nome}
          />

          <View style={estilos.separadorCx}></View>

          {/* Caixa de texto data de nascimento do aluno */}
          <TextInput
            style={estilos.cx}
            onChangeText={txtDataNascimento => {
              setUtilizador({ ...utilizador, dataNascimento: txtDataNascimento })
            }}
            placeholder="Data nascimento"
            placeholderTextColor={"black"}
            value={utilizador.dataNascimento}
          />

          <View style={estilos.separadorCx}></View>

          {/* Botão registar aluno */}
          <TouchableHighlight
            style={[estilos.btn, {width: 80}]}
            onPress={async () => {
              if (
                utilizador.nome === '' ||
                utilizador.dataNascimento === '' ||
                utilizador.email === '' ||
                utilizador.passe === ''
              ) {
                alert('Favor preencher todos os campos');
              } else {
                setModalPoliticaPrivacidade({
                  tipoConta: 'utilizador',
                  visibilidade: true
                })
                setModalTermosUtilizacao({
                  tipoConta: 'utilizador',
                  visibilidade: true
                })
              }
            }}
          >
            <Text style={estilos.txtBtn}>Registrar</Text>
          </TouchableHighlight>
        </View> :

        <View style={estilosPaginaRegistar.conteinerRegistar}>
           {/* Caixa de texto email do funcionário */}
           <TextInput
            style={estilos.cx}
            onChangeText={txtEmail => {
              setFuncionario({ ...funcionario, email: txtEmail })
            }}
            placeholder="Email"
            placeholderTextColor={"black"}
            value={funcionario.email}
          />

          <View style={estilos.separadorCx}></View>
          
          {/* Caixa de texto passe do funcionário */}
          <TextInput
            style={estilos.cx}
            onChangeText={txtPasse => {
              setFuncionario({ ...funcionario, passe: txtPasse })
            }}
            placeholder="Senha"
            placeholderTextColor={"black"}
            secureTextEntry={true}
            value={funcionario.passe}
          />

          <View style={estilos.separadorCx}></View>
          
          {/* Caixa de texto nome do funcionário */}
          <TextInput
            style={estilos.cx}
            onChangeText={txtNome => {
              setFuncionario({ ...funcionario, nome: txtNome }) 
            }}
            placeholder="Nome"
            placeholderTextColor={"black"}
            value={funcionario.nome}
          />

          <View style={estilos.separadorCx}></View>

          {/* Caixa de texto data de nascimento do funcionário */}
          <TextInput
            style={estilos.cx}
            onChangeText={txtDataNascimento => {
              setFuncionario({ ...funcionario, dataNascimento: txtDataNascimento })
            }}
            placeholder="Data nascimento"
            placeholderTextColor={"black"}
            value={funcionario.dataNascimento}
          />

          <View style={estilos.separadorCx}></View>


          {/* Botão registar funcionário */}
          <TouchableHighlight
            style={[estilos.btn, {width: 80}]}
            onPress={ () => {
              if (
                funcionario.nome === '' || 
                funcionario.dataNascimento === '' || 
                funcionario.email === '' || 
                funcionario.passe === ''
              )
              alert('Favor preencher todos os campos')
              else {
                setModalPoliticaPrivacidade({
                  tipoConta: 'funcionario',
                  visibilidade: true
                })
                setModalTermosUtilizacao({
                  tipoConta: 'funcionario',
                  visibilidade: true
                })
              }
            }}
            >
            <Text style={estilos.txtBtn}>Registrar</Text>
          </TouchableHighlight>
        </View>
      }


      {/* Modal Termos de Utilização */}
      <ModalTermosUtilizacao
        modalTermosUtilizacao={modalTermosUtilizacao}
        setModalTermosUtilizacao={setModalTermosUtilizacao}
        utilizador={utilizador}
        setUtilizador={setUtilizador}
        funcionario={funcionario}
        setFuncionario={setFuncionario}
      />

      {/* Modal Politica Privacidade */}
      <ModalPoliticaPrivacidade
        modalPoliticaPrivacidade={modalPoliticaPrivacidade}
        setModalPoliticaPrivacidade={setModalPoliticaPrivacidade}
      />

    </View>
  )
}

const estilosPaginaRegistar = StyleSheet.create({
  conteinerPaginaRegistar: {
    flex: 1,
    alignItems: 'center',
  },

  opRegistarConteiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'white',
    marginTop: 15
  },

  btnOpRegistar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  conteinerRegistar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

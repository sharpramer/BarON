import React, { Component, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, bd } from "../../firebase";
import { View, TextInput, TouchableHighlight, StyleSheet, Text } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function PaginaRegistar() {
  const [opRegistar, setOpRegistar] = useState('Utilizador')
  const [utilizador, setUtilizador] = useState({
    nome: '',
    dataNascimento: '',
    email: '',
    passe: ''
  })

  const [funcionario, setFuncionario] = useState({
    nome: '',
    dataNascimento: '',
    email: '',
    passe: ''
  })

  const guardarRegisto = async (colecao, nome, dataNascimento, numero, email, passe) => {
    try {
      const utilizadorCredencial = await createUserWithEmailAndPassword(auth, email, passe)
      const utilizador = utilizadorCredencial.user
      await addDoc(collection(bd, colecao), {
        codigo: utilizador.uid,
        nome: nome,
        dataNascimento: dataNascimento,
        numero: numero + 1,
        email: email,
      })
      alert('Registado com sucesso!')
    }
    catch (erro) {
      alert('Erro ao registar')
      console.log(`Erro ao registar: ${erro}`)
    }
  }
  
  return (
    <View style={estilos.registarConteiner}> 
      <View style={estilos.opRegistarConteiner}>
        {/* Botão opção de registar aluno */}
        <TouchableHighlight
          style={[
            estilos.btnOpRegistar, {
              backgroundColor: opRegistar === 'Utilizador' ? 'blue' : 'white'
            }
          ]}
          onPress={() => {
            setOpRegistar({ opRegistar: "Utilizador" })
          }}
        >
          <Text>Utilizador</Text>
        </TouchableHighlight>

        {/* Botão opção de registar funcionário */}
        <TouchableHighlight
          style={[
            estilos.btnOpRegistar,
            { backgroundColor: opRegistar === 'Funcionario' ? 'blue' : 'white' }
          ]}
          onPress={() => { setOpRegistar({ opRegistar: 'Funcionario' }) }}
        >
          <Text>Funcionário</Text>
        </TouchableHighlight>
        
      </View>

      { opRegistar === 'Utilizador' ?
        <View>
          {/* Caixa de texto nome do aluno */}
          <TextInput
            style={estilos.txt}
            onChangeText={txtNome => {
              setUtilizador({ ...utilizador, nome: txtNome })
            }}
            value={utilizador.nome}
          />

          {/* Caixa de texto data de nascimento do aluno */}
          <TextInput
            style={estilos.txt}
            onChangeText={txtDataNascimento => {
              setUtilizador({ ...utilizador, dataNascimento: txtDataNascimento })
            }}
          value={utilizador.dataNascimento}
          />

          {/* Caixa de texto email do aluno */}
          <TextInput
            style={estilos.txt}
            onChangeText={txtEmail => {
              setUtilizador({ ...utilizador, email: txtEmail })
            }}
            value={utilizador.email}
          />

          {/* Caixa de texto passe do aluno */}
          <TextInput
            style={estilos.txt}
            onChangeText={txtPasse => {
              setUtilizador({ ...utilizador, passe: txtPasse })
            }}
            value={utilizador.passe}
          />

          {/* Botão registar aluno */}
          <TouchableHighlight
            style={{backgroundColor: 'green'}}
            onPress={() => {
              if (
                utilizador.nome === '' ||
                utilizador.dataNascimento === '' ||
                utilizador.email === '' ||
                utilizador.passe === ''
              ) {
                alert('Favor preencher todos os campos');
              } else {
                guardarRegisto(
                  'utilizador',
                  utilizador.nome,
                  utilizador.dataNascimento,
                  utilizador.numero,
                  utilizador.email,
                  utilizador.passe
                );
              }
            }}
          >
            <Text>Registar</Text>
          </TouchableHighlight>
        </View> :

        <View>
          {/* Caixa de texto nome do funcionário */}
          <TextInput
            style={estilos.txt}
            onChangeText={txtNome => {
              setFuncionario({ ...funcionario, nome: txtNome }) 
            }}
            value={funcionario.nome}
          />

          {/* Caixa de texto data de nascimento do funcionário */}
          <TextInput
            style={estilos.txt}
            onChangeText={txtDataNascimento => {
              setFuncionario({ ...funcionario, dataNascimento: txtDataNascimento })
            }}
            value={funcionario.dataNascimento}
          />

          {/* Caixa de texto email do funcionário */}
          <TextInput
            style={estilos.txt}
            onChangeText={txtEmail => {
              setFuncionario({ ...funcionario, email: txtEmail })
            }}
            value={funcionario.email}
          />
          
          {/* Caixa de texto passe do funcionário */}
          <TextInput
            style={estilos.txt}
            onChangeText={txtPasse => {
              setFuncionario({ ...funcionario, passe: txtPasse })
            }}
            value={funcionario.passe}
          />

          {/* Botão registar funcionário */}
          <TouchableHighlight
            style={{backgroundColor: 'green'}}
            onPress={ () => {
              if (funcionario.nome === '' || funcionario.numero === '' || funcionario.dataNascimento === '' || funcionario.email === '' || funcionario.passe === '')
                alert('Favor preencher todos os campos')
              else {
                guardarRegisto('funcionario', funcionario.nome, funcionario.dataNascimento, funcionario.numero, funcionario.email, funcionario.passe)
              }
            }}
          >
            <Text>Registar</Text>
          </TouchableHighlight>
        </View>
      }
    </View>
  )
}

const estilos = StyleSheet.create({
  registarConteiner: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
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

  txt: {
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'green'
  }
})

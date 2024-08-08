import React, { Component, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { bd } from "../../firebase";
import { View, TextInput, TouchableHighlight, StyleSheet, Text } from "react-native";

export default function PaginaRegistar() {
  const [opRegistar, setOpRegistar] = useState('Utilizador')
  const [utilizador, setUtilizador] = useState({
    nome: '',
    dataNascimento: '',
    numero: '',
    email: '',
    passe: ''
  })

  const [funcionario, setFuncionario] = useState({
    nome: '',
    dataNascimento: '',
    numero: '',
    email: '',
    passe: ''
  })
  
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

          {/* Caixa de texto número do aluno */}
          <TextInput
            style={estilos.txt}
            onChangeText={txtNum => {
              setUtilizador({ ...utilizador, numero: txtNum })
            }}
            value={utilizador.numero}
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
            onPress={ () => {
              if (utilizador.nome === '' || utilizador.dataNascimento === '' || utilizador.numero === '' || utilizador.email === '' || utilizador.passe === '')
                alert('Favor preencher todos os campos')
              else {
                const docRef = collection(bd, "utilizador")
                addDoc(docRef, {
                  nome: utilizador.nome,
                  dataNascimento: utilizador.dataNascimento,
                  numero: utilizador.numero,
                  email: utilizador.email,
                  passe: utilizador.passe
                })
                console.log(`Nome: ${utilizador.nome}, dataNascimento: ${utilizador.dataNascimento}, numero: ${utilizador.numero}, email: ${utilizador.email}, passe: ${utilizador.passe},`)
                alert('Gravado com sucesso!')
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
            value={dataNascimentoFuncionario}
          />

          {/* Caixa de texto número do funcionário */}
          <TextInput
            style={estilos.txt}
            onChangeText={txtNum => {
              setFuncionario({ ...funcionario, numero: txtNum })
            }}
            value={funcionario.numero}
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
              if (nomeFuncionario === '' || dataNascimentoFuncionario === '' || numFuncionario === '' || emailFuncionario === '' || passeFuncionario === '')
                alert('Favor preencher todos os campos')
              else {
                alert(``)
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

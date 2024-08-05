import React, { Component, useState } from "react";
import { View, TextInput, TouchableHighlight, StyleSheet, Text } from "react-native";
import Utilizador, { Funcionario } from "../Global";

export default function PaginaRegistar() {
  const [opRegistar, setOpRegistar] = useState('Utilizador')
  const [nomeUtilizador, setNomeUtilizador] = useState('')
  const [dataNascimentoUtilizador, setDataNascimentoUtilizador] = useState('')
  const [numUtilizador, setNumUtilizador] = useState('')
  const [emailUtilizador, setEmailUtilizador] = useState('')
  const [passeUtilizador, setPasseUtilizador] = useState('')
  
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
                setNomeUtilizador({ nomeUtilizador: txtNome }) 
              }}
              value={nomeUtilizador}
            />

            {/* Caixa de texto data de nascimento do aluno */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtDataNascimento => {
                setDataNascimentoUtilizador({ dataNascimentoUtilizador: txtDataNascimento })
              }}
            value={dataNascimentoUtilizador}
            />

            {/* Caixa de texto número do aluno */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtNum => {
                setNumUtilizador({ numUtilizador: txtNum })
              }}
              value={numUtilizador}
            />

            {/* Caixa de texto email do aluno */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtEmail => {
                setEmailUtilizador({ emailUtilizador: txtEmail })
              }}
              value={emailUtilizador}
            />

            {/* Caixa de texto passe do aluno */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtPasse => {
                setPasseUtilizador({ passeUtilizador: txtPasse })
              }}
              value={passeUtilizador}
            />

            {/* Botão registar aluno */}
            <TouchableHighlight
              style={{backgroundColor: 'green'}}
              onPress={ () => {
                if (nomeUtilizador === '' || dataNascimentoUtilizador === '' || numUtilizador === '' || emailUtilizador === '')
                  alert('Favor preencher todos os campos')
                else {
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
                setOpRegistar({ nomeFuncionario: txtNome }) 
              }}
              value={nomeFuncionario}
            />

            {/* Caixa de texto data de nascimento do funcionário */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtDataNascimento => {
                setOpRegistar({ dataNascimentoFuncionario: txtDataNascimento })
              }}
              value={dataNascimentoFuncionario}
            />

            {/* Caixa de texto número do funcionário */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtNum => {
                setOpRegistar({ numFuncionario: txtNum })
              }}
              value={numFuncionario}
            />

            {/* Caixa de texto email do funcionário */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtEmail => {
                setOpRegistar({ emailFuncionario: txtEmail })
              }}
              value={emailFuncionario}
            />
            
            {/* Caixa de texto passe do aluno */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtPasse => {
                setOpRegistar({ passeFuncionario: txtPasse })
              }}
              value={passeFuncionario}
            />

            {/* Botão registar funcionário */}
            <TouchableHighlight
              style={{backgroundColor: 'green'}}
              onPress={ () => {
                if (nomeFuncionario === '' || dataNascimentoFuncionario === '' || numFuncionario === '' || emailFuncionario === '' || passeFuncionario === '')
                  alert('Favor preencher todos os campos')
                else {
                  Funcionario.nome = nomeFuncionario
                  Funcionario.dataNascimento = dataNascimentoFuncionario
                  Funcionario.numero = numFuncionario
                  Funcionario.email = emailFuncionario
                  Funcionario.passe = passeFuncionario
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

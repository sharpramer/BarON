import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, bd } from "../../firebase";
import { View, TextInput, TouchableHighlight, StyleSheet, Text } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { estilos } from "../estilos";

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
      console.error(`Erro ao registar: ${erro}`)
    }
  }
  
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
          <Text>Utilizador</Text>
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
            placeholder="Passe"
            placeholderTextColor={"black"}
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
            style={estilos.btn}
            onPress={async () => {
              if (
                utilizador.nome === '' ||
                utilizador.dataNascimento === '' ||
                utilizador.email === '' ||
                utilizador.passe === ''
              ) {
                alert('Favor preencher todos os campos');
              } else {
                try {
                  guardarRegisto(
                    'Utilizadores',
                    utilizador.nome,
                    utilizador.dataNascimento,
                    utilizador.numero,
                    utilizador.email,
                    utilizador.passe
                  )
                  
                } catch (erro) {
                  console.error(`Erro ao registar utilizador:${erro}`);
                }
              }
            }}
          >
            <Text>Registar</Text>
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
            placeholder="Passe"
            placeholderTextColor={"black"}
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
            style={estilos.btn}
            onPress={ () => {
              if (
                funcionario.nome === '' || 
                funcionario.numero === '' || 
                funcionario.dataNascimento === '' || 
                funcionario.email === '' || 
                funcionario.passe === ''
              )
                alert('Favor preencher todos os campos')
              else {
                guardarRegisto(
                  'Funcionarios', 
                  funcionario.nome, 
                  funcionario.dataNascimento, 
                  funcionario.numero, 
                  funcionario.email, 
                  funcionario.passe
                )
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

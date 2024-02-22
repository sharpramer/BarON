import React, { Component } from "react";
import { View, TextInput, TouchableHighlight, StyleSheet, Text } from "react-native";
import Aluno, { Funcionario } from "../Global";

export default class PaginaRegistar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opRegistar: 'Aluno',
      nomeAluno: '',
      dataNascimentoAluno: '',
      numAluno: '',
      emailAluno: '',
      nomeFuncionario: '',
      dataNascimentoFuncionario: '',
      numFuncionario: '',
      emailFuncionario: ''
    };
  }

  render() {
    return (
      <View style={estilos.registarConteiner}> 
        <View style={estilos.opRegistarConteiner}>
          {/* Botão opção de registar aluno */}
          <TouchableHighlight
            style={[
              estilos.btnOpRegistar, {
                backgroundColor: this.state.opRegistar === 'Aluno' ? 'blue' : 'white'
              }
            ]}
            onPress={() => {
              this.setState({ opRegistar: "Aluno" });
            }}
          >
            <Text>Aluno</Text>
          </TouchableHighlight>
          {/* Botão opção de registar funcionário */}
          <TouchableHighlight
            style={[
              estilos.btnOpRegistar,
              { backgroundColor: this.state.opRegistar === 'Funcionario' ? 'blue' : 'white' }
            ]}
            onPress={() => { this.setState({ opRegistar: 'Funcionario' }) }}
          >
            <Text>Funcionário</Text>
          </TouchableHighlight>
        </View>

        {this.state.opRegistar === 'Aluno' ?
          <View>
            {/* Caixa de texto nome do aluno */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtNome => {
                this.setState({ nomeAluno: txtNome }) 
              }}
              value={this.state.nomeAluno}
            />

            {/* Caixa de texto data de nascimento do aluno */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtDataNascimento => {
                this.setState({ dataNascimentoAluno: txtDataNascimento })
              }}
              value={this.state.dataNascimentoAluno}
            />

            {/* Caixa de texto número do aluno */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtNum => {
                this.setState({ numAluno: txtNum })
              }}
              value={this.state.numAluno}
            />

            {/* Caixa de texto email do aluno */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtEmail => {
                this.setState({ emailAluno: txtEmail });
              }}
              value={this.state.emailAluno}
            />

            <TouchableHighlight
              style={{backgroundColor: 'green'}}
              onPress={ () => {
                if (this.state.nomeAluno === '' || this.state.dataNascimentoAluno === '' || this.state.numAluno === '' || this.state.emailAluno === '')
                  alert('Favor preencher todos os campos')
                else {
                  Aluno.nome = this.state.nomeAluno
                  Aluno.dataNascimento = this.state.dataNascimentoAluno
                  Aluno.numero = this.state.numAluno
                  Aluno.email = this.state.emailAluno
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
                this.setState({ nomeFuncionario: txtNome }) 
              }}
              value={this.state.nomeFuncionario}
            />

            {/* Caixa de texto data de nascimento do funcionário */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtDataNascimento => {
                this.setState({ dataNascimentoFuncionario: txtDataNascimento })
              }}
              value={this.state.dataNascimentoFuncionario}
            />

            {/* Caixa de texto número do funcionário */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtNum => {
                this.setState({ numFuncionario: txtNum })
              }}
              value={this.state.numFuncionario}
            />

            {/* Caixa de texto email do funcionário */}
            <TextInput
              style={estilos.txt}
              onChangeText={txtEmail => {
                this.setState({ emailFuncionario: txtEmail });
              }}
              value={this.state.emailFuncionario}
            />

            {/* Botão registar funcionário */}
            <TouchableHighlight
              style={{backgroundColor: 'green'}}
              onPress={ () => {
                if (this.state.nomeFuncionario === '' || this.state.dataNascimentoFuncionario === '' || this.state.numFuncionario === '' || this.state.emailFuncionario === '')
                  alert('Favor preencher todos os campos')
                else {
                  Funcionario.nome = this.state.nomeFuncionario
                  console.log(Funcionario.nome)
                  Funcionario.dataNascimento = this.state.dataNascimentoFuncionario
                  console.log(Funcionario.dataNascimento)
                  Funcionario.numero = this.state.numFuncionario
                  console.log(Funcionario.numero)
                  Funcionario.email = this.state.emailFuncionario
                  console.log(Funcionario.email)
                }
              }}
            >
              <Text>Registar</Text>
            </TouchableHighlight>
          </View>
        }
      </View>
    );
  }
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

import React, {useState} from "react"
import { StyleSheet, View, TouchableHighlight, TextInput, Text} from "react-native";

export default function PaginaLogin({navigation}) {
  const [opLogin, setOpLogin] = useState("Utilizador")
  const [codUtilizador, setCodUtilizador] = useState('')
  const [passeUtilizador, setPasseUtilizador] = useState('')
  const [codFuncionario, setCodFuncionario] = useState('')
  const [passeFuncionario, setPasseFuncionario] = useState('')
  
  return(
    <View style={estilos.conteiner}>
      {/* Conteiner opção de login utilizador/funcionário */}
      <View style={estilos.opLoginConteiner}> 
        {/* Botão opção de login utilizador */}
        <TouchableHighlight 
          style={[
            estilos.btnOpLogin, {
              backgroundColor: opLogin === 'Utilizador' ? 'blue' : 'white' 
            }
          ]}
          onPress={() => {
            setOpLogin("Utilizador")
          }}
        >
          <Text>Utilizador</Text>
        </TouchableHighlight>
        {/* Botão opção de login funcionário */}
        <TouchableHighlight 
          style={[
            estilos.btnOpLogin, 
            {backgroundColor: opLogin === 'Funcionario' ? 'blue' : 'white' }
          ]}
          onPress={() => {setOpLogin("Funcionario")}}
        >
          <Text>Funcionário</Text>
        </TouchableHighlight>
      </View>

      {/* Conteiner login utilizador */}
      { opLogin === 'Utilizador' ?
        <View style={estilos.loginConteiner}>
          {/* Caixa de texto Codigo utilizador */}
          <TextInput
            style={
              /* Estilo caixa de texto código utilizador*/
              estilos.txt
            }
            onChangeText={(texto) => {setCodUtilizador(texto)}}
            value={codUtilizador}
          />
          {/* Caixa de texto passe utilizador */}
          <TextInput            
            style={
              /* Estilo caixa de texto passe utilizador*/
              estilos.txt
            }
            onChangeText={(texto) => {setPasseUtilizador(texto)}}
            value={passeUtilizador}
          />
          {/* Botão login utilizador */}
          <TouchableHighlight
            style={estilos.btnLogin}
            onPress={() => {
              if (codUtilizador === '' || passeUtilizador === '')
                alert('Favor preencher todos os campos')
              else
                navigation.navigate('PaginaInicialUtilizador')
            }}
          >
            <Text>Login</Text>
          </TouchableHighlight>
        </View> :

        <View>
          {/* Caixa de texto Codigo funcionário */}
          <TextInput
            style={estilos.txt}
            onChangeText={(texto) => {setCodFuncionario(texto)}}
            value={codFuncionario}
          />
          
          {/* Caixa de texto Passe funcionário */}
          <TextInput            
            style={estilos.txt}
            onChangeText={(texto) => {setPasseFuncionario(texto)}}
            value={passeFuncionario}
          />

          {/* Botão login funcionário */}
          <TouchableHighlight
            style={estilos.btnLogin}
            onPress={() => {
              if (codFuncionario === '' || passeFuncionario === '')
                alert('Favor preencher todos os campos')
              else
                navigation.navigate('PaginaInicialFuncionario')
            }}
          >
            <Text>Login</Text>
          </TouchableHighlight>
        </View>
      }
      <View>
        <TouchableHighlight
          style={{backgroundColor: 'purple'}}
          onPress={() => {navigation.navigate('PaginaRegistar')}}
        >
          <Text>Registar</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const estilos = StyleSheet.create({
  conteiner:{ // Estilo do aplicativo
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },

  opLoginConteiner:{ // Estilo do conteiner com as opçoes de login
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'white',
  },

  loginConteiner:{ // Estilo do conteiner login

  },

  btnOpLogin:{ // Estilo botões com as opções de login
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  txt:{
    backgroundColor: 'green', 
    color: 'white',
    borderWidth: 2,
    borderColor:'#900',
  },

  btnLogin:{
    backgroundColor: '#900'
  }
});  
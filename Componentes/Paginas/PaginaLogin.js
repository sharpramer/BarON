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
              backgroundColor: opLogin === 'Utilizador' ? '#0f73d1' : 'white' 
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
            {backgroundColor: opLogin === 'Funcionario' ? '#0f73d1' : 'white' }
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
            placeholder="Código ou email"
            placeholderTextColor={"white"}
            value={codUtilizador}
          />
          
          <View style={estilos.separadorTxt}></View>

          {/* Caixa de texto passe utilizador */}
          <TextInput            
            style={
              /* Estilo caixa de texto passe utilizador*/
              estilos.txt
            }
            onChangeText={(texto) => {setPasseUtilizador(texto)}}
            placeholder="Palavra-Passe"
            placeholderTextColor={"white"}
            value={passeUtilizador}
          />
          
          <View style={estilos.separadorTxt}></View>

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
            <Text style={estilos.txtBtnLogin}>Login</Text>
          </TouchableHighlight>
        </View> :

        <View style={estilos.loginConteiner}>
          {/* Caixa de texto Codigo funcionário */}
          <TextInput
            style={estilos.txt}
            onChangeText={(texto) => {setCodFuncionario(texto)}}
            placeholder="Código ou email"
            placeholderTextColor={"white"}
            value={codFuncionario}
          />

          <View style={estilos.separadorTxt}></View>
          
          {/* Caixa de texto Passe funcionário */}
          <TextInput            
            style={estilos.txt}
            onChangeText={(texto) => {setPasseFuncionario(texto)}}
            placeholder="Palavra-Passe"
            placeholderTextColor={"white"}
            value={passeFuncionario}
          />
          
          <View style={estilos.separadorTxt}></View>

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
            <Text style={estilos.txtBtnLogin}>Login</Text>
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
    backgroundColor: "#2b2b2b",
  },

  opLoginConteiner:{ // Estilo do conteiner com as opçoes de login
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'white',
  },

  loginConteiner:{ // Estilo do conteiner login
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  btnOpLogin:{ // Estilo botões com as opções de login
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  txt:{
    color: 'white',
  },

  separadorTxt:{
    width: 120,
    backgroundColor: "#0f73d1",
    borderWidth: 3,
    borderColor: "#0f73d1",
    borderRadius: 5
  },

  btnLogin:{
    marginTop: 20,
    width: 70, 
    backgroundColor: '#11a7ed',
    padding: 7,
    borderRadius: 9
  },
  
  txtBtnLogin:{
    textAlign: "center",
  }
});  
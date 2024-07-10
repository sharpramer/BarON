import Checkbox from 'expo-checkbox';
import React, {useEffect, useState} from "react"
import { StyleSheet, View, TouchableHighlight, TextInput, Text} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Utilizador, { Funcionario } from "../Global";

export default function PaginaLogin({navigation}) {
  const [opLogin, setOpLogin] = useState("Utilizador")
  const [codUtilizador, setCodUtilizador] = useState('')
  const [passeUtilizador, setPasseUtilizador] = useState('')
  const [guardarPasseUtilizador, setGuardarPasseUtilizador] = useState(false)
  const [codFuncionario, setCodFuncionario] = useState('')
  const [passeFuncionario, setPasseFuncionario] = useState('')
  const [guardarPasseFuncionario, setGuardarPasseFuncionario] = useState(false)
  const [mostrarPasse, setMostrarPasse] = useState(false)

  return(
    <SafeAreaView style={estilos.conteiner}>
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
            style={estilos.cx}
            onChangeText={(texto) => {setCodUtilizador(texto)}}
            placeholder="Código ou email"
            placeholderTextColor={"white"}
            value={codUtilizador}
          />
          
          <View style={estilos.separadorTxt}></View>

          {/* Caixa de texto passe utilizador */}
          <TextInput            
            style={estilos.cx}
            onChangeText={(texto) => {setPasseUtilizador(texto)}}
            placeholder="Palavra-Passe"
            placeholderTextColor={"white"}
            secureTextEntry={!mostrarPasse} 
            value={passeUtilizador}
          />
          
          <View style={estilos.separadorTxt}></View>

          <View style={estilos.conteinerCheckbox}> 
            {/* Conteiner Checkbox */} 
            <Checkbox // Checkbox guardar passe
              style={estilos.chb}
              value={guardarPasseUtilizador}
              onValueChange={() => {setGuardarPasseUtilizador(prevGuardarPasse => !prevGuardarPasse, console.log(`Guardar passe: ${guardarPasseUtilizador}`))}}
              color={guardarPasseUtilizador ? "black" : undefined}
            />
            <Text style={{color: "white"}}>Memorizar passe</Text>

            <Checkbox // Checkbox mostrar passe
              style={estilos.chb}
              value={mostrarPasse}
              onValueChange={() => {setMostrarPasse(prevMostrarPasse => !prevMostrarPasse, console.log(`Mostrar passe ${mostrarPasse}`))}}
              color={mostrarPasse ? "black" : undefined}
            />
            <Text style={{color: "white"}}>Mostrar passe</Text>
          </View>

          {/* Botão login utilizador */}
          <TouchableHighlight
            style={estilos.btnLogin}
            onPress={() => {
              if (codUtilizador === '' || passeUtilizador === '')
                alert('Favor preencher todos os campos')
              else{
                navigation.navigate('PaginaInicialUtilizador')
              }
            }}
          >
            <Text style={estilos.txtBtnLogin}>Login</Text>
          </TouchableHighlight>
        </View> :

        <View style={estilos.loginConteiner}>
          {/* Caixa de texto Codigo funcionário */}
          <TextInput
            style={estilos.cx}
            onChangeText={(texto) => {setCodFuncionario(texto)}}
            placeholder="Código ou email"
            placeholderTextColor={"white"}
            value={codFuncionario}
          />

          <View style={estilos.separadorTxt}></View>
          
          {/* Caixa de texto Passe funcionário */}
          <TextInput
            style={estilos.cx}
            onChangeText={(texto) => {setPasseFuncionario(texto)}}
            placeholder="Palavra-Passe"
            placeholderTextColor={"white"}
            secureTextEntry={!mostrarPasse}
            value={passeFuncionario}
          />
          
          <View style={estilos.separadorTxt}></View>

          {/* Conteiner Checkbox */}
          <View style={estilos.conteinerCheckbox}>
              <Checkbox
                style={estilos.chb}
                value={guardarPasseFuncionario}
                onValueChange={() => setGuardarPasseFuncionario(prevGuardarPasse => !prevGuardarPasse)}
                color={guardarPasseFuncionario ? "black" : undefined}
              />
              <Text style={{color: "white"}}>Memorizar passe</Text>

              <Checkbox
                style={estilos.chb}
                value={mostrarPasse}
                onValueChange={() => setMostrarPasse(prevMostrarPasse => !prevMostrarPasse)}
                color={mostrarPasse ? "black" : undefined}
              />
              <Text style={{color: "white"}}>Mostrar passe</Text>
          </View>

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
    </SafeAreaView>
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

  cx:{
    color: 'white',
    textAlign: "center"
  },

  separadorTxt:{
    width: 120,
    marginBottom: 15,
    backgroundColor: "#0f73d1",
    borderWidth: 3,
    borderColor: "#0f73d1",
    borderRadius: 5
  },

  conteinerCheckbox:{
    flexDirection:"row",
  },

  chb:{
    marginRight: 8,
    marginLeft: 14
  },

  btnLogin:{
    marginTop: 15,
    width: 70, 
    backgroundColor: '#11a7ed',
    padding: 7,
    borderRadius: 9
  },

  txtBtnLogin:{
    textAlign: "center",
  },

});  
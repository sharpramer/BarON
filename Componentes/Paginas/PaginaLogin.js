import React, {useEffect, useState} from "react"
import { StyleSheet, View, TouchableHighlight, TextInput, Text} from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import Checkbox from 'expo-checkbox'
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { guardarLocal, buscarLocal, buscarValorFirestore } from "../Global"

export default function PaginaLogin({navigation}) {
  const [opLogin, setOpLogin] = useState("Utilizador")
  const [utilizador, setUtilizador] = useState({
    email: '',
    passe: '',
    guardarPasse: true,
  })
  const [funcionario, setFuncionario] = useState({
    email: '',
    passe: '',
    guardarPasse: true,
  })
  const [mostrarPasse, setMostrarPasse] = useState(false)

  useEffect(() => {
    const carregarPasse = async () => {
      const passeGuardada = await buscarLocal('Passe')
      passeGuardada ? [setUtilizador({...utilizador, passe: passeGuardada}), navigation.navigate('PaginaInicialUtilizador')] : setUtilizador({...utilizador, passe: ''}) 
    }
    carregarPasse()
  },[])

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
            onChangeText={texto => {
              setUtilizador({...utilizador, email: texto})
            }}
            placeholder="Código ou email"
            placeholderTextColor={"white"}
            value={utilizador.email}
          />
          
          <View style={estilos.separadorTxt}></View>

          {/* Caixa de texto passe utilizador */}
          <TextInput            
            style={estilos.cx}
            onChangeText={texto => {
              setUtilizador({...utilizador, passe: texto})
            }}
            placeholder="Palavra-Passe"
            placeholderTextColor={"white"}
            secureTextEntry={!mostrarPasse} 
            value={utilizador.passe}
          />
          
          <View style={estilos.separadorTxt}></View>
          
          <View style={estilos.conteinerCheckbox}> 
            {/* Conteiner Checkbox */} 
            <Checkbox // Checkbox guardar passe / memorizar passe utilizador
              style={estilos.chb}
              value={utilizador.guardarPasse}
              onValueChange={() => {
                setUtilizador(prevUtilizador => ({
                  ...prevUtilizador,
                  guardarPasse: !prevUtilizador.guardarPasse
                }))
              }}
              color={utilizador.guardarPasse ? "black" : undefined}
            />
            <Text style={{color: "white"}}>Memorizar passe</Text>

            <Checkbox // Checkbox mostrar passe
              style={estilos.chb}
              value={mostrarPasse}
              onValueChange={() => {
                setMostrarPasse(prevMostrarPasse => !prevMostrarPasse, console.log(`Mostrar passe ${mostrarPasse}`))
              }}
              color={mostrarPasse ? "black" : undefined}
            />
            <Text style={{color: "white"}}>Mostrar passe</Text>
          </View>

          <TouchableHighlight
            onPress={() => {
              const emailFirestore = buscarValorFirestore('utilizador', 'email', utilizador.email)
              console.log(emailFirestore)
            }}
          >
            <Text>Teste</Text>
          </TouchableHighlight>

          {/* Botão login utilizador */}
          <TouchableHighlight
            style={estilos.btnLogin}
            onPress={async () => {
              if (utilizador.email === '' || utilizador.passe === '') {
                alert('Favor preencher todos os campos')
              } else {
                if (utilizador.guardarPasse) {
                  guardarLocal('Passe', utilizador.passe)
                }
                try {
                  await signInWithEmailAndPassword(auth, utilizador.email, utilizador.passe)
                  navigation.navigate('PaginaInicialUtilizador')
                } catch (erro) {
                  alert('Erro ao fazer login, verifique o email e palavra-passe e tente novamente!')
                  console.log(erro)
                }
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
            onChangeText={(texto) => {setFuncionario({...funcionario, email: texto})}}
            placeholder="Código ou email"
            placeholderTextColor={"white"}
            value={funcionario.email}
          />

          <View style={estilos.separadorTxt}></View>
          
          {/* Caixa de texto Passe funcionário */}
          <TextInput
            style={estilos.cx}
            onChangeText={(texto) => {setFuncionario({...funcionario, passe: texto})}}
            placeholder="Palavra-Passe"
            placeholderTextColor={"white"}
            secureTextEntry={!mostrarPasse}
            value={funcionario.passe}
          />
          
          <View style={estilos.separadorTxt}></View>

          {/* Conteiner Checkbox Funcionário */}
          <View style={estilos.conteinerCheckbox}>
            <Checkbox
              style={estilos.chb}
              value={funcionario.guardarPasse}
              onValueChange={() => {
                setUtilizador(prevFuncionario => ({
                  ...prevFuncionario,
                  guardarPasse: !prevFuncionario.guardarPasse
                }))
              }}
              color={funcionario.guardarPasse ? "black" : undefined}
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
            onPress={async () => {
              if (funcionario.email === '' || funcionario.passe === '') {
                alert('Favor preencher todos os campos')
              } else {
                if (funcionario.guardarPasse) {
                  guardarLocal('Passe', funcionario.passe)
                }
                try {
                  await signInWithEmailAndPassword(auth, funcionario.email, funcionario.passe)
                  navigation.navigate('PaginaInicialFuncionario')
                } catch (erro) {
                  alert('Erro ao fazer login, verifique o email e palavra-passe e tente novamente!')
                  console.log(erro)
                }
              }
            }}
          >
            <Text style={estilos.txtBtnLogin}>Login</Text>
          </TouchableHighlight>
        </View>
      }
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

})  
import React, {useEffect, useState} from "react"
import { StyleSheet, View, TouchableHighlight, TextInput, Text} from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import Checkbox from 'expo-checkbox'
import { auth, bd } from "../../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { guardarLocal, buscarLocal } from "../Global"
import { collection, getDocs, query, where } from "firebase/firestore"

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

  const emailsPermitidos = [
    "enzoceleghini.work@gmail.com",
    "athosfrota.saoleo@gmail.com",
    "suelencruz.saoleo@gmail.com",
    "rogerioceleghini@gmail.com",
    "rogerioceleghini@outlook.com",
  ]

  useEffect(() => {
    const carregarPasse = async () => {
      const passeGuardada = await buscarLocal('Passe')
      passeGuardada ? [setUtilizador({...utilizador, passe: passeGuardada}), navigation.navigate('PaginaInicialUtilizador')] : setUtilizador({...utilizador, passe: ''}) 
    }
    carregarPasse()
  },[])

  // Função para verificar se o email existe na coleção inserida

  async function verificarEmail(colecao, email) {
    try {
      const linha = await getDocs(query(
        collection(bd, colecao),
        where('email', '==', email)
      ))
      if(!linha.empty){
        console.log('Email encontrado no verificarEmail')
        return true
      }
      else {
        console.log('Email não encontrado')
        return false
      }
    } catch (erro) {
      console.error(`Erro ao encontrar email: ${erro}`)
    }
  }

  async function fazerLogin(colecao, email, passe, guardarPasse, paginaInicial) {
    if (email === '' || passe === '') {
      alert('Favor preencher todos os campos')
      return
    }
  
    try {
      // Fazer login no Firebase Auth
      const credencial = await signInWithEmailAndPassword(auth, email, passe)
  
      if (credencial.user.emailVerified) {
        if (guardarPasse) {
          guardarLocal('Passe', passe)  // Memorizar passe
        }
  
        // Verifica se o email existe na coleção
        const emailExiste = await verificarEmail(colecao, email)
  
        if (emailExiste) {
          console.log('Email verificado e login bem-sucedido')
          navigation.navigate(paginaInicial)  // Navegar para a página inicial
        } else {
          alert('Conta não encontrada. Verifique seu email e tente novamente.')
        }
      } else {
        alert('Por favor, verifique seu email antes de fazer login.')
      }
    } catch (erro) {
      console.error('Erro ao fazer login:', erro)
      alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.')
    }
  }  

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
          <Text>Usuário</Text>
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
          {/* Caixa de texto email utilizador */}
          <TextInput
            style={estilos.cx}
            onChangeText={texto => {
              setUtilizador({...utilizador, email: texto})
            }}
            placeholder="Email"
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
            placeholder="Senha"
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
            <Text style={{color: "white"}}>Memorizar senha</Text>

            <Checkbox // Checkbox mostrar passe
              style={estilos.chb}
              value={mostrarPasse}
              onValueChange={() => {
                setMostrarPasse(prevMostrarPasse => !prevMostrarPasse, console.log(`Mostrar passe ${mostrarPasse}`))
              }}
              color={mostrarPasse ? "black" : undefined}
            />
            <Text style={{color: "white"}}>Mostrar senha</Text>
          </View>

          <View style={estilos.conteinerBotoes}>
            {/* Botão login funcionário */}
            <TouchableHighlight
              style={[estilos.btnLogin, {marginHorizontal: 20}]}
              onPress={async () => {
                if (!emailsPermitidos.includes(funcionario.email.toLocaleLowerCase())) {
                  alert("Você não tem permissão para fazer login como funcionário. Tente novamente mais tarde")
                } else {
                  await fazerLogin(
                    'Funcionarios', 
                    funcionario.email,
                    funcionario.passe,
                    funcionario.guardarPasse,
                    'PaginaInicialFuncionario'
                  )
                }
              }}
            >
              <Text style={estilos.txtBtnLogin}>Login</Text>
            </TouchableHighlight>
            {/* Botão login utilizador */}
            <TouchableHighlight
              style={estilos.btnLogin}
              onPress={async () => {
                await fazerLogin(
                  'Utilizadores', 
                  utilizador.email,
                  utilizador.passe,
                  utilizador.guardarPasse,
                  'PaginaInicialUtilizador'
                )
              }}
            >
              <Text style={estilos.txtBtnLogin}>Login</Text>
            </TouchableHighlight>
          </View> :
        </View> :

        <View style={estilos.loginConteiner}>
          {/* Caixa de texto Codigo funcionário */}
          <TextInput
            style={estilos.cx}
            onChangeText={(texto) => {setFuncionario({...funcionario, email: texto})}}
            placeholder="Email"
            placeholderTextColor={"white"}
            value={funcionario.email}
          />

          <View style={estilos.separadorTxt}></View>
          
          {/* Caixa de texto Passe funcionário */}
          <TextInput
            style={estilos.cx}
            onChangeText={(texto) => {setFuncionario({...funcionario, passe: texto})}}
            placeholder="Senha"
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
                setFuncionario(prevFuncionario => ({
                  ...prevFuncionario,
                  guardarPasse: !prevFuncionario.guardarPasse
                }))
              }}
              color={funcionario.guardarPasse ? "black" : undefined}
            />
            <Text style={{color: "white"}}>Memorizar senha</Text>

            <Checkbox
              style={estilos.chb}
              value={mostrarPasse}
              onValueChange={() => setMostrarPasse(prevMostrarPasse => !prevMostrarPasse)}
              color={mostrarPasse ? "black" : undefined}
            />
            <Text style={{color: "white"}}>Mostrar senha</Text>
          </View>

          <View style={estilos.conteinerBotoes}>
            {/* Botão login funcionário */}
            <TouchableHighlight
              style={[estilos.btnLogin, {marginHorizontal: 20}]}
              onPress={async () => {
                if (!emailsPermitidos.includes(funcionario.email.toLocaleLowerCase())) {
                  alert("Você não tem permissão para fazer login como funcionário. Tente novamente mais tarde")
                } else {
                  await fazerLogin(
                    'Funcionarios', 
                    funcionario.email,
                    funcionario.passe,
                    funcionario.guardarPasse,
                    'PaginaInicialFuncionario'
                  )
                }
              }}
            >
              <Text style={estilos.txtBtnLogin}>Login</Text>
            </TouchableHighlight>
    
            <TouchableHighlight
              style={[estilos.btnLogin, {marginHorizontal: 20}]}
              onPress={() => {
                alert('Caso necessite de algum suporte, contacte-nos pelo email: divinobarrasul@gmail.com')
              }}
            >
              <Text style={estilos.txtBtnLogin}>Ajuda</Text>
            </TouchableHighlight>
  
          </View>

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

  conteinerBotoes:{
    flexDirection: 'row', 
    alignItems: 'center'
  }

})  
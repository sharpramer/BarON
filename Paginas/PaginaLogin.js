import React, {useState} from "react"
import { StyleSheet, View, TouchableHighlight, TextInput, Text} from "react-native";

export default function PaginaLogin({navigation}) {
    const [opLoginAluno, setOpLoginAluno] = useState(true)
    const [codAluno, setCodAluno] = useState('')
    const [passeAluno, setPasseAluno] = useState('')
    const [codFuncionario, setCodFuncionario] = useState('')
    const [passeFuncionario, setPasseFuncionario] = useState('')
    
    return(
      <View style={estilos.loginConteiner}>
        <View style={estilos.opLoginConteiner}>
          <TouchableHighlight 
            style={estilos.btnOpLogin}
            onPress={() => {setOpLoginAluno(true)}}
          >
            <Text>Aluno</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={estilos.btnOpLogin}
            onPress={() => {setOpLoginAluno(false)}}
          >
            <Text>Funcionário</Text>
          </TouchableHighlight>
        </View>
        {/* Conteiner login Aluno */}
        { opLoginAluno ?
          <View>
            {/* Caixa de texto Codigo aluno */}
            <TextInput
              style={estilos.txt}
              onChangeText={(texto) => {setCodAluno(texto)}}
              value={codAluno}
            />
            {/* Caixa de texto Passe aluno */}
            <TextInput            
              style={estilos.txt}
              onChangeText={(texto) => {setPasseAluno(texto)}}
              value={passeAluno}
            />
            {/* Botão login aluno */}
            <TouchableHighlight
              style={estilos.btnLogin}
              onPress={() => {navigation.navigate('PaginaInicialAluno')}}
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
              onPress={() => {navigation.navigate('PaginaInicialFuncionario')}}
            >
              <Text>Login</Text>
            </TouchableHighlight>
          </View>
        }
      </View>
    )
}

const estilos = StyleSheet.create({
    loginConteiner:{
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'black'
    },
  
    opLoginConteiner:{
      flexDirection: 'row',
      justifyContent: 'center',
      color: 'white',
    },
  
    btnOpLogin:{
      padding: 10,
      backgroundColor:'white',
    },
  
    txt:{
      backgroundColor: 'green', 
      color: 'white',
      borderWidth: 2,
      borderColor:'#900'
    },

    btnLogin:{
        backgroundColor: '#900'
    }
});  
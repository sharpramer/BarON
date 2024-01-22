import React, {useState} from "react"
import { StyleSheet, View, TouchableHighlight, TextInput, Text} from "react-native";

export default function PaginaLogin({navigation}) {
    const [opLogin, setOpLogin] = useState("Aluno")
    const [codAluno, setCodAluno] = useState('')
    const [passeAluno, setPasseAluno] = useState('')
    const [codFuncionario, setCodFuncionario] = useState('')
    const [passeFuncionario, setPasseFuncionario] = useState('')
    
    return(
      <View style={estilos.loginConteiner}>
        {/* Conteiner opção aluno/funcionário */}
        <View style={estilos.opLoginConteiner}> 
          <TouchableHighlight 
            style={[estilos.btnOpLogin, {backgroundColor: opLogin === 'Aluno' ? 'blue' : 'white' }]}
            onPress={() => {
              setOpLogin("Aluno")
            }}
          >
            <Text>Aluno</Text>
          </TouchableHighlight>
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
        {/* Conteiner login Aluno */}
        { opLogin ?
          <View>
            {/* Caixa de texto Codigo aluno */}
            <TextInput
              style={
                /* Estilo caixa de texto código aluno*/
                estilos.txt
              } 
              onChangeText={(texto) => {setCodAluno(texto)}}
              value={codAluno}
            />
            {/* Caixa de texto passe aluno */}
            <TextInput            
              style={
                /* Estilo caixa de texto passe aluno*/
                estilos.txt
              }
              onChangeText={(texto) => {setPasseAluno(texto)}}
              value={passeAluno}
            />
            {/* Botão login aluno */}
            <TouchableHighlight
              style={estilos.btnLogin}
              onPress={() => {
                if (codAluno === '' || passeAluno === '')
                  alert('Favor preencher todos os campos')
                else
                  navigation.navigate('PaginaInicialAluno')
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
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
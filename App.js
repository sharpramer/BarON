import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Navegador = createStackNavigator()

function PaginaLogin({navigation}) {
  const [opLoginAluno, setOpLoginAluno] = useState(true)
  
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
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Navegador.Navigator>
        <Navegador.Screen
          name='Login'
          component={ PaginaLogin }
          options={ { title:'Login' } }
        />
      </Navegador.Navigator>
    </NavigationContainer>
  );
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
  }
});

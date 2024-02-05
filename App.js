import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PaginaLogin from "./Paginas/PaginaLogin";
import PaginaInicialAluno from "./Paginas/PaginaInicialAluno";
import PaginaInicialFuncionario from "./Paginas/PaginaInicialFuncionario";

const Navegador = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Navegador.Navigator>
        <Navegador.Screen
          name='PaginaLogin'
          component={ PaginaLogin }
          options={ { title:'Login' } }
        />
        <Navegador.Screen
          name='PaginaInicialAluno'
          component={ PaginaInicialAluno }
          options={ { title:'Jose' } }
        />
        <Navegador.Screen
          name='PaginaInicialFuncionario'
          component={ PaginaInicialFuncionario }
          options={ { title:'Início' } }
        />
      </Navegador.Navigator>
    </NavigationContainer>
  );
}
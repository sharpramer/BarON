import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PaginaLogin from "./Componentes/Paginas/PaginaLogin";
import PaginaRegistar from './Componentes/Paginas/PaginaRegistar';
import PaginaInicialAluno from "./Componentes/Paginas/PaginaInicialAluno";
import PaginaInicialFuncionario from "./Componentes/Paginas/PaginaInicialFuncionario";

const Navegador = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Navegador.Navigator>
        <Navegador.Screen
          name='PaginaLogin'
          component={ PaginaLogin }
        />

        <Navegador.Screen
          name='PaginaRegistar'
          component={ PaginaRegistar }
        />

        <Navegador.Screen
          name='PaginaInicialAluno'
          component={ PaginaInicialAluno }
        />

        <Navegador.Screen
          name='PaginaInicialFuncionario'
          component={ PaginaInicialFuncionario }
        />
      </Navegador.Navigator>
    </NavigationContainer>
  );
}
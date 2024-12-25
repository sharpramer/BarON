import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaLogin from './Componentes/Paginas/PaginaLogin';
import PaginaRegistar from './Componentes/Paginas/PaginaRegistar';
import PaginaInicialUtilizador from './Componentes/Paginas/Utilizador/PaginaInicialUtilizador';
import PaginaInicialFuncionario from './Componentes/Paginas/Funcionário/PaginaInicialFuncionario';
import PaginaBoasVindas from './Componentes/Paginas/PaginaBoasVindas';

const Navegador = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navegador.Navigator screenOptions={{ headerShown: false }}>
        <Navegador.Screen name="PaginaBoasVindas" component={PaginaBoasVindas} />
        <Navegador.Screen name="PaginaLogin" component={PaginaLogin} />
        <Navegador.Screen name="PaginaRegistar" component={PaginaRegistar} />
        <Navegador.Screen name="PaginaInicialUtilizador" component={PaginaInicialUtilizador} />
        <Navegador.Screen name="PaginaInicialFuncionario" component={PaginaInicialFuncionario} />
      </Navegador.Navigator>
    </NavigationContainer>
  );
}

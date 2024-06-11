import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PaginaInicio from "./PaginaInicio";
import PaginaDefinicoes from "./PaginaDefinicoes";
import PaginaSaldo from "./PaginaSaldo";

const Separador = createBottomTabNavigator();

export default function PaginaInicialUtilizador() {
  return (
    <Separador.Navigator initialRouteName='Inicio' screenOptions={{ headerShown: false }}>
      <Separador.Screen name="Saldo" component={PaginaSaldo} options={{title: 'Saldo'}}/>
      <Separador.Screen name="Inicio" component={PaginaInicio} options={{title: 'Início'}}/>
      <Separador.Screen name="Definicoes" component={PaginaDefinicoes} options={{title: 'Definições'}}/>
    </Separador.Navigator>
  );
}
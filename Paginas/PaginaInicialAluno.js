import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PaginaInicio } from "./PaginaInicio";
import { PaginaDefinicoes } from "./PaginaDefinicoes";
import { PaginaSaldo } from "./PaginaSaldo";

const Separador = createBottomTabNavigator();

export default function PaginaInicialAluno() {
  return (
    <Separador.Navigator initialRouteName='Inicio'>
      <Separador.Screen name="Saldo" component={PaginaSaldo}/>
      <Separador.Screen name="Inicio" component={PaginaInicio} />
      <Separador.Screen name="Definicoes" component={PaginaDefinicoes} />
    </Separador.Navigator>
  );
}
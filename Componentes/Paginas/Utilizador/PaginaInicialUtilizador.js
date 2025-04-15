import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import PaginaInicio from "./PaginaInicio"
import PaginaDefinicoes from "./PaginaDefinicoes/PaginaDefinicoes"
import PaginaPedidos from "./PaginaPedidos"

const Separador = createBottomTabNavigator()

export default function PaginaInicialUtilizador() {
  return (
    <Separador.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
      <Separador.Screen name="Pedidos" component={PaginaPedidos} options={{ title: 'Pedidos' }} />
      <Separador.Screen name="Inicio" component={PaginaInicio} options={{ title: 'Início' }} />
      <Separador.Screen name="Definicoes" component={PaginaDefinicoes} options={{ title: 'Configurações' }} />
    </Separador.Navigator>
  )
}

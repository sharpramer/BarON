import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import PaginaPedidos from "./PaginaPedidos"

const Separador = createBottomTabNavigator()

export default function PaginaInicialUtilizador() {
  return (
    <Separador.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
      <Separador.Screen name="Pedidos" component={PaginaPedidos} options={{ title: 'Pedidos' }} />
    </Separador.Navigator>
  )
}

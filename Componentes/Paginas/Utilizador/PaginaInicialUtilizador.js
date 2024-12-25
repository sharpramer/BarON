import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PaginaInicio from "./PaginaInicio";
import PaginaDefinicoes from "./PaginaDefinicoes/PaginaDefinicoes";
import PaginaSaldo from "./PaginaSaldo";
import PaginaCarrinho from "./PaginaCarrinho";
import PaginaPedidos from "./PaginaPedidos"; // Certifique-se de que o caminho está correto

const Separador = createBottomTabNavigator();

export default function PaginaInicialUtilizador() {
  return (
    <Separador.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
      <Separador.Screen name="Saldo" component={PaginaSaldo} options={{ title: 'Saldo' }} />
      <Separador.Screen name="Carrinho" component={PaginaCarrinho} options={{ title: 'Carrinho' }} />
      <Separador.Screen name="Inicio" component={PaginaInicio} options={{ title: 'Início' }} />
      <Separador.Screen name="Pedidos" component={PaginaPedidos} options={{ title: 'Pedidos' }} />
      <Separador.Screen name="Definicoes" component={PaginaDefinicoes} options={{ title: 'Definições' }} />
    </Separador.Navigator>
  );
}

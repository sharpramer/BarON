import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Separador = createBottomTabNavigator();

function PaginaInicio() {
  return (
    <View>
      <Text>Início</Text>
    </View>
  );
}

function PaginaSaldo() {
  return (
    <View>
      <Text>Saldo</Text>
    </View>
  );
}

function PaginaDefinicoes() {
  return (
    <View>
      <Text>Definições</Text>
    </View>
  );
}

export default function PaginaInicialAluno() {
  return (
    <Separador.Navigator>
      <Separador.Screen name="Saldo" component={PaginaSaldo} />
      <Separador.Screen name="Inicio" component={PaginaInicio} />
      <Separador.Screen name="Definicoes" component={PaginaDefinicoes} />
    </Separador.Navigator>
  );
}

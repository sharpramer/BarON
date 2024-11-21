import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Hook para navegação
import { auth } from "../../../../firebase";
import { apagarLocal } from "../../../Global";

export function MenuSair() {
  const navigation = useNavigation(); // Usando o hook useNavigation para acessar a navegação

  async function fazerLogout() {
    try {
      // Fazendo o logout no Firebase
      await auth.signOut();
      await apagarLocal("Passe")
      // Exibindo a mensagem de sucesso
      alert('Saiu com sucesso');

      // Resetando a navegação e redirecionando para a tela de login
      navigation.reset({
        index: 0, // Zera o histórico de navegação
        routes: [{ name: 'PaginaLogin' }], // Redireciona para a tela de login
      });
    } catch (erro) {
      console.error("Erro ao realizar logout:", erro.message);
      alert(`Erro ao sair: ${erro.message}`);
    }
  }

  return (
    <View>
      <TouchableHighlight onPress={fazerLogout}>
        <Text>Sair</Text>
      </TouchableHighlight>
    </View>/* Botão para o menu de sair */
  );
}

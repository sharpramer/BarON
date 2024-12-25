import { useState } from "react";
import { View, TouchableHighlight, Modal, Text, TextInput } from "react-native";
import { auth, } from "../../../../firebase"
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { estilos } from "../../../estilos"

export default function MenuAlterarPasse() {
  const [modalAlterarPasseVisibilidade, setModalAlterarPasseVisibilidade] = useState(false);
  const [novaPalavraPasse, setNovaPalavraPasse] = useState('');
  const [passe, setPasse] = useState('');
  const [emailAtual, setEmailAtual] = useState('');

  // Função para reautenticar o utilizador
  const reautenciarUtilizador = async () => {
    try {
      const utilizador = auth.currentUser
      if (utilizador) {
        const credencial = EmailAuthProvider.credential(emailAtual, passe)
        await reauthenticateWithCredential(utilizador, credencial)
        console.log('Utilizador reautenticado com sucesso')
        return true
      } else {
        console.log('Utilizador não encontrado')
        return false
      }
    } catch (erro) {
      console.error(`Erro ao reautenticar utilizador: ${erro}`)
      return false
    }
  }

  // Função para editar passe no Authentication
  const editarPasseAuth = async (novaPasse) => {
    try {
      const utilizador = auth.currentUser
      if (utilizador) {
        // Atualiza o passe no Firebase Authentication
        await updatePassword(utilizador, novaPasse)
        console.log('Email atualizado com sucesso no Firebase Authentication')
        alert('Email atualizado com sucesso no Firebase Authentication')
      } else {
        console.log('Utilizador não encontrado no Authentication')
      }
    } catch (erro) {
      console.error(`Erro ao atualizar email no Firebase Authentication: ${erro}`)
      
      if (erro.code === "auth/weak-password") {
        alert('A palavra-passe deve conter ao menos 6 caracteres')
      } else if (erro.code === "auth/requires-recent-login") {
        alert("A operação exige uma reautenticação. Por favor, faça login novamente e tente atualizar a palavra-passe.")
      } else if (erro.code === "auth/wrong-password") {
        alert("A palavra-passe está incorreta")
      } else {
        alert("Erro ao atualizar o email. Tente novamente.")
      }
      
    }
  }

  // Função para atualizar a passe no Authentication
  const atualizarDados = async () => {
    const isReAutenticado = await reautenciarUtilizador()

    if (isReAutenticado) {
      await editarPasseAuth(novaPalavraPasse)
      emailAtual = ''
      passe = ''
      novaPalavraPasse = ''
    } else {
      alert('Erro ao atualizar. Tente novamente.')
    }
  }

  return (
    <View>
        {/* Botão alterar passe */}
        <TouchableHighlight
          style={estilos.btnFecharModal}
          onPress={() => { setModalAlterarPasseVisibilidade(true) }}
        >
          <Text>Alterar passe</Text>
        </TouchableHighlight>

        <Modal 
          visible={modalAlterarPasseVisibilidade}
          onRequestClose={setModalAlterarPasseVisibilidade}
        >
          {/* Botão fechar modal menu alterar passe */}
          <TouchableHighlight
            style={estilos.btnFecharModal}
            onPress={() => {
              setModalAlterarPasseVisibilidade(false);
            }}
          >
            <Text>X</Text>
          </TouchableHighlight>

          <View style={estilos.conteiner}>
            <TextInput
              style={estilos.cx}
              onChangeText={(texto) => setEmailAtual(texto)}
              placeholder="Email atual"
              placeholderTextColor={"black"}
              value={emailAtual}
            />

            <View style={estilos.separadorCx}></View>
            {/* Caixa de texto passe */}
            <TextInput
              style={estilos.cx}
              onChangeText={(texto) => setPasse(texto)}
              placeholder="Palavra-Passe atual"
              placeholderTextColor={"black"}
              value={passe}
            />
            <View style={estilos.separadorCx}></View>

            <TextInput
              style={estilos.cx}
              onChangeText={(texto) => setNovaPalavraPasse(texto)}
              placeholder="Palavra-Passe nova"
              placeholderTextColor={"black"}
              value={novaPalavraPasse}
            />
            <View style={estilos.separadorCx}></View>

            <TouchableHighlight
              onPress={() => { atualizarDados() }}
            >
              <Text>Guardar</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
  );
}
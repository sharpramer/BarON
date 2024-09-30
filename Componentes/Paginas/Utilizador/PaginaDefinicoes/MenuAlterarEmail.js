import React, { useState } from "react"
import { View, TouchableHighlight, Modal, Text, TextInput} from "react-native"
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore"
import { auth, bd } from "../../../../firebase"
import { reauthenticateWithCredential, updateEmail, EmailAuthProvider } from "firebase/auth"
import { estilos } from "../../../estilos"

export default function MenuAlterarEmail() {
  const [modalAlterarEmailVisibilidade, setModalAlterarEmailVisibilidade] = useState(false)
  const [email, setEmail] = useState('')
  const [passe, setPasse] = useState('')
  const [novoEmail, setNovoEmail] = useState('')

  // Função para alterar o email no Firestore
  const editarEmailFirestore = async (editarDados) => {
    try {
      const utilizadorRef = collection(bd, 'utilizador')
      const linha = query(utilizadorRef, where('email', '==', email))
      const snapshot = await getDocs(linha)

      if (!snapshot.empty) {
        snapshot.forEach(async (doc) => {
          const docRef = doc.ref
          await updateDoc(docRef, editarDados)
          alert("Email alterado com sucesso no Firestore!")
        })
      } else {
        alert('Nenhuma conta foi encontrada com esse email.')
      }
    } catch (erro) {
      console.error(`Erro ao encontrar documento: ${erro}`)
    }
  }

  // Função para reautenticar o usuário
  const reautenciarUtilizador = async () => {
    try {
      const utilizador = auth.currentUser
      if (utilizador) {
        const credencial = EmailAuthProvider.credential(email, passe)
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

  // Função para editar email no Authentication
  const editarEmailAuth = async (novoEmail) => {
    try {
      const utilizador = auth.currentUser
      if (utilizador) {
        // Atualiza o email no Firebase Authentication
        await updateEmail(utilizador, novoEmail)
        console.log('Email atualizado com sucesso no Firebase Authentication')
      } else {
        console.log('Utilizador não encontrado no Authentication')
      }
    } catch (erro) {
      console.error(`Erro ao atualizar email no Firebase Authentication: ${erro}`)
      if (erro.code === "auth/requires-recent-login") {
        alert("A operação exige uma reautenticação. Por favor, faça login novamente e tente atualizar o email.")
      } else {
        alert("Erro ao atualizar o email. Tente novamente.")
      }
    }
  }

  // Função para atualizar os dados
  const atualizarDados = async () => {
    const isReAutenticado = await reautenciarUtilizador()

    if (isReAutenticado) {
      const editarEmail = { email: novoEmail }

      // Atualizar no Firestore
      await editarEmailFirestore(editarEmail)

      // Atualizar no Firebase Authentication
      await editarEmailAuth(novoEmail)
    } else {
      alert('Erro ao atualizar. Tente novamente.')
    }
  }

  return (
    <View>
      {/* Botão alterar email */}
      <TouchableHighlight onPress={() => setModalAlterarEmailVisibilidade(true)}>
        <Text>Alterar email</Text>
      </TouchableHighlight>

      <Modal
        visible={modalAlterarEmailVisibilidade}
        onRequestClose={() => setModalAlterarEmailVisibilidade(false)}
      >
        {/* Botão fechar modal */}
        <TouchableHighlight
          style={estilos.btnFecharModal}
          onPress={() => setModalAlterarEmailVisibilidade(false)}
        >
          <Text>X</Text>
        </TouchableHighlight>

        <View style={estilos.conteiner}>
          {/* Caixa de texto email antigo */}
          <TextInput
            style={estilos.cx}
            onChangeText={(texto) => setEmail(texto)}
            placeholder="Email antigo"
            placeholderTextColor={"black"}
            value={email}
          />
          <View style={estilos.separadorCx}></View>

          {/* Caixa de texto passe */}
          <TextInput
            style={estilos.cx}
            onChangeText={(texto) => setPasse(texto)}
            placeholder="Passe"
            placeholderTextColor={"black"}
            value={passe}
            secureTextEntry
          />
          <View style={estilos.separadorCx}></View>

          {/* Caixa de texto novo email */}
          <TextInput
            style={estilos.cx}
            onChangeText={(texto) => setNovoEmail(texto)}
            placeholder="Email novo"
            placeholderTextColor={"black"}
            value={novoEmail}
          />
          <View style={estilos.separadorCx}></View>

          {/* Botão editar email */}
          <TouchableHighlight
            style={estilos.btn}
            onPress={atualizarDados}
          >
            <Text style={estilos.txtBtn}>Editar</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    </View>
  )
}
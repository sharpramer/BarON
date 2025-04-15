import React, { useState } from "react"
import { View, TouchableHighlight, Modal, Text, TextInput} from "react-native"
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore"
import { auth, bd } from "../../../../firebase"
import { reauthenticateWithCredential, updateEmail, EmailAuthProvider, getAuth } from "firebase/auth"
import { estilos } from "../../../estilos"

export default function MenuAlterarEmail() {
  const [modalAlterarEmailVisibilidade, setModalAlterarEmailVisibilidade] = useState(false)
  const [email, setEmail] = useState('')
  const [passe, setPasse] = useState('')
  const [novoEmail, setNovoEmail] = useState('')

  // Função para alterar o email no Firestore
  const editarEmailFirestore = async (editarDados) => {
    try {
      const utilizadorRef = collection(bd, 'Utilizadores')
      const contaSnapshot = await getDocs(query(
        utilizadorRef, 
        where('email', '==', email)
      ))

      if (!contaSnapshot.empty) {
        contaSnapshot.forEach(async (doc) => {
          const docRef = doc.ref
          await updateDoc(docRef, editarDados)
          alert("Email alterado com sucesso!")
        })
      } else {
        alert('Nenhuma conta foi encontrada com esse email.')
      }
    } catch (erro) {
      console.error(`Erro ao encontrar documento: ${erro}`)
    }
  }

  // Função para reautenticar o utilizador
  const reautenciarUtilizador = async () => {
    try {
      const utilizador = auth.currentUser
      if (utilizador) {
        const credencial = EmailAuthProvider.credential(utilizador.email, passe)
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
      if (!utilizador) {
        console.log('Utilizador não encontrado no Authentication')
        return
      }

      if (!utilizador.emailVerified) {
        alert("Você precisa verificar seu email atual antes de alterá-lo.")
        return
      }
  
      // Atualiza o email no Firebase Auth
      await updateEmail(utilizador, novoEmail)
      console.log('Email atualizado com sucesso no Firebase Authentication')
  
      // Recarrega o usuário
      await utilizador.reload()
      const userAtualizado = getAuth().currentUser
  
      // Confirma se método existe e envia verificação
      if (userAtualizado.emailVerified === false && typeof userAtualizado.sendEmailVerification === 'function') {
        await userAtualizado.sendEmailVerification()
        alert("Um email de verificação foi enviado para o novo endereço.")
      } else {
        alert("O email foi atualizado, mas não foi possível enviar a verificação.")
      }
  
    } catch (erro) {
      console.error(`Erro ao atualizar email no Firebase Authentication: ${erro}`)
  
      if (erro.code === "auth/email-already-in-use") {
        alert("Este email já está em uso por outro usuário.")
      } else if (erro.code === "auth/requires-recent-login") {
        alert("Você precisa fazer login novamente para poder alterar o email.")
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
      // 
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
          style={estilos.btnFechar}
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
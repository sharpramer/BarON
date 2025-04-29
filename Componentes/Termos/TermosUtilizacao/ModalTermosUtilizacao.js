import { useState } from "react";
import { Text, Modal, TouchableHighlight, View } from "react-native";
import CheckBox from "expo-checkbox";
import TermosUtilizacao from "./TermosUtilizacao";
import { collection, addDoc } from "firebase/firestore";
import { app, auth, bd } from "../../../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from "firebase/auth";
import { estilos } from "../../estilos";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalTermosUtilizacao(props) {
    const [isTermosAceitos, setIsTermosAceitos] = useState(false)

    const auth = getAuth();
    
    const testarFirebase = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, "teste@email.com", "senha123");
        console.log("Usuário criado:", userCredential.user);
      } catch (error) {
        console.error("Erro ao criar usuário:", error.message);
      }
    };
    
    const guardarRegisto = async (colecao, nome, dataNascimento, emailInserido, passeInserido) => {
        try {
          console.log("Dados recebidos para registro:");
          console.log("Coleção:", colecao);
          console.log("Nome:", nome);
          console.log("Data de Nascimento:", dataNascimento);
          console.log("Email:", emailInserido);
          console.log("Senha:", passeInserido);

          const utilizadorCredencial = (await createUserWithEmailAndPassword(auth, emailInserido, passeInserido)).user
    
          await addDoc(collection(bd, colecao), {
            codigo: utilizadorCredencial.uid,
            nome: nome,
            dataNascimento: dataNascimento,
            email: emailInserido,
          })
    
          if(utilizadorCredencial && !utilizadorCredencial.emailVerified){
            await sendEmailVerification(utilizadorCredencial)
            alert('Um email de verificação foi enviado para o seu email.')
          }
          alert('Registrado com sucesso!')
        }
        catch (erro) {
          if (erro.code === 'auth/email-already-in-use') {
            alert('O e-mail já está em uso. Por favor, tente outro.');
          } else if (erro.code === 'auth/weak-password') {
            alert('A senha é muito fraca. Escolha uma mais segura.');
          } else {
            alert('Erro ao registrar. Por favor, tente novamente.');
          }
          console.error(`Erro ao registrar: ${erro.message}`);
        }
      }

    return(
      <SafeAreaView>
        <Modal
            visible={props.modalTermosUtilizacao.visibilidade}
            onRequestClose={() => {props.setModalTermosUtilizacao(prevModalTermosUtilizacao => ({
                ...prevModalTermosUtilizacao,
                visibilidade: false
            }))}}
        >
            {/* Componente Termos de Utilização */}
            <TermosUtilizacao/>

            <View style={estilos.conteinerCheckbox}>

            <CheckBox
                style={estilos.chb}
                value={isTermosAceitos}
                onValueChange={() => { setIsTermosAceitos(prevTermos => !prevTermos) }}
                color={isTermosAceitos ? 'black' : undefined}
            />

            <Text>Declaro que li e aceito os Termos de Utilização</Text>

            </View>

            <TouchableHighlight
              style={[estilos.btn, {alignSelf: 'center', paddingHorizontal: 6, paddingVertical: 10}]}
              onPress={() => {
                if (isTermosAceitos){ 
                  if (props.modalTermosUtilizacao.tipoConta === 'utilizador') {
                    guardarRegisto(
                      'Utilizadores',
                      props.utilizador.nome,
                      props.utilizador.dataNascimento,
                      props.utilizador.email,
                      props.utilizador.passe,
                    )
                  } 
                  else {
                    guardarRegisto(
                      'Funcionarios',
                      props.funcionario.nome,
                      props.funcionario.dataNascimento,
                      props.funcionario.email,
                      props.funcionario.passe,
                    )
                  }
                }
                
                else {
                  alert(
                    'Favor aceitar os termos!'
                  )
                }
              }}
              >
              <Text>Registrar</Text>
            </TouchableHighlight>

        </Modal>
      </SafeAreaView>
    )
}
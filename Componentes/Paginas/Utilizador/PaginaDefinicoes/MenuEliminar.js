import React, { useState } from "react"
import { View, Text, TouchableHighlight, Modal, TextInput } from "react-native"
import { fazerLogout } from "../../../Global"
import { estilos } from "../../../estilos"
import { auth, bd } from "../../../../firebase"
import { useNavigation } from "@react-navigation/native"
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore"

export default function MenuEliminar() {
    const [modalEliminarVisibilidade, setModalEliminarVisibilidade] = useState(false)
    const [emailUtilizador, setEmailUtilizador] = useState('')
    const [passeUtilizador, setPasseUtilizador] = useState('')
    
    const navegacao = useNavigation()

    const eliminarContaFirestore = async () => {
        try {
            const linha = await getDocs(
                query(
                    collection(bd, 'utilizador'), 
                    where('email', '==', emailUtilizador)
                )
            )

            if (!linha.empty) {
                await deleteDoc(linha.docs[0].ref)
                console.log('Conta eliminada com sucesso no firestore');
                
            } else {
                console.error('Conta não encontrada')
            }
        } catch (erro) {
            alert('Não foi possível eliminar a sua conta')
            console.error('Erro ao eliminar: ', erro)
            
        }
    }

    const eliminarContaAuthentication = async () => {
        try {
            const utilizadorAtual = auth.currentUser
            if (utilizadorAtual) {
                try {
                    await utilizadorAtual.delete()
                    console.log("Conta eliminada com sucesso!")
                } catch (erro) {
                    console.error('Erro ao excluir utilizador', erro)
                }
            } else {
                console.error('Utilizador não autenticado')
            }
        } catch (erro) {
            console.error('Erro ao eliminar no authentication: ', erro);
        }
    }

    const eliminarConta = async () => {
        try {
            await eliminarContaAuthentication()  
            
            await eliminarContaFirestore()
            
            await fazerLogout(navegacao)

            alert('Conta eliminada com sucesso')                
        } catch (erro) {
            alert('Erro ao eliminar conta')
            console.error('Erro ao eliminar conta', erro)
        }
    }
    
    return (
        <View>
            {/* Botão menu Editar */}
            <TouchableHighlight
                onPress={() => {
                    setModalEliminarVisibilidade(true)
                }}
            >
                <Text>Eliminar</Text>
            </TouchableHighlight>

            <Modal
                visible={modalEliminarVisibilidade}
                onRequestClose={setModalEliminarVisibilidade}
            >
                {/* Botão fechar modal menu Editar */}
                <TouchableHighlight
                    style={estilos.btnFecharModal}
                    onPress={() => {
                        setModalEliminarVisibilidade(false)
                    }}
                >
                    <Text>X</Text>
                </TouchableHighlight>

                <View style={estilos.conteiner}>
                    {/* Caixa de texto email utilizador */}
                    <TextInput
                        style={estilos.cx}
                        onChangeText={(texto) => setEmailUtilizador(texto)}
                        placeholder="Email"
                        placeholderTextColor={"black"}
                        value={emailUtilizador}
                    />
                    <View style={estilos.separadorCx}></View>

                    <TextInput
                        style={estilos.cx}
                        onChangeText={(texto) => setPasseUtilizador(texto)}
                        placeholder="Palavra-Passe"
                        placeholderTextColor={"black"}
                        value={passeUtilizador}
                    />
                    <View style={estilos.separadorCx}></View>

                    {/* Botão para eliminar conta */}
                    <TouchableHighlight
                        style={estilos.btn}
                        onPress={() => { 
                            if(emailUtilizador == '' || passeUtilizador == '')
                                alert('Favor prencher todos os campos!')
                            else
                                eliminarConta()
                        }}
                    >
                        <Text style={estilos.txtBtn}>Eliminar</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
    )
}
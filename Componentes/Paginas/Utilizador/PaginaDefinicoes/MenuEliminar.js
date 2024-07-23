import React, { useState } from "react"
import { View, Text, TouchableHighlight, Modal, TextInput } from "react-native"
import { estilos } from "../../../estilos"

export default function MenuEliminar() {
    const [modalEliminarVisibilidade, setModalEliminarVisibilidade] = useState(false)
    const [emailUtilizador, setEmailUtilizador] = useState('')
    const [passeUtilizador, setPasseUtilizador] = useState('')
    
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

                    <TouchableHighlight
                        onPress={() => { 
                            if(emailUtilizador == '' || passeUtilizador == '')
                                alert('Favor prencher todos os campos!')
                            else
                                alert("Conta eliminada com sucesso!") 
                        }}
                    >
                        <Text>Eliminar</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
    )
  }
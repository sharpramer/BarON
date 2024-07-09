import React, { useState } from "react"
import { View, Text, TouchableHighlight, Modal, StyleSheet } from "react-native"
import { estilos } from "../../../Global"

export default function MenuEliminar() {
    const [modalEliminarVisibilidade, setModalEliminarVisibilidade] = useState(false);
    
    return (
        <View>
            {/* Botão menu Editar */}
            <TouchableHighlight
                onPress={() => {
                setModalEliminarVisibilidade(true);
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
                    setModalEliminarVisibilidade(false);
                }}
                >
                <Text>X</Text>
                </TouchableHighlight>
            </Modal>
        </View>
    );
  }
import React, {useState} from "react";
import { View, TouchableHighlight, Modal, Text } from "react-native";
import { estilos } from "../../../Global"

export default function MenuRelatorioMensal() {
  const [modalRelatorioMensalVisibilidade, setModalRelatorioMensalVisibilidade] = useState(false);
    return (
        <View>
        {/* Botão menu relatório mensal */}
        <TouchableHighlight
            onPress={() => {
            setModalRelatorioMensalVisibilidade(true);
            }}
        >
            <Text>Relatório mensal</Text>
        </TouchableHighlight>

        <Modal
            visible={modalRelatorioMensalVisibilidade}
            onRequestClose={setModalRelatorioMensalVisibilidade}
        >
            {/* Botão fechar modal menu relatório mensal */}
            <TouchableHighlight
            style={estilos.btnFecharModal}
            onPress={() => {
                setModalRelatorioMensalVisibilidade(false);
            }}
            >
            <Text>X</Text>
            </TouchableHighlight>

        </Modal>
        </View>
    );
}
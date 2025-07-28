import { Text, Modal, TouchableHighlight, View } from "react-native";
import TermosUtilizacao from "../../../Termos/TermosUtilizacao/TermosUtilizacao";
import { useState } from "react";
import { estilos } from "../../../estilos";
import { estilosMenus } from "./estilos/estilosMenus";

export default function MenuTermosUtilizacao() {
    const [modalVisibilidade, setModalVisibilidade] = useState(false)

    return(
        <View>
            <TouchableHighlight
                style={estilosMenus.tituloMenu}
                onPress={() => {setModalVisibilidade(true)}}
            >
                <Text>Termos de Utilizacao</Text>
            </TouchableHighlight>

            <Modal
                visible={modalVisibilidade}
                onRequestClose={() => {setModalVisibilidade(false)}}
            >
                <TouchableHighlight
                    style={estilos.btnFechar}
                    onPress={() => {
                        setModalVisibilidade(false)
                    }}
                >
                    <Text>X</Text>
                </TouchableHighlight>

                <TermosUtilizacao/>
            </Modal>
        </View>
    )
}
import { Text, Modal, TouchableHighlight, View } from "react-native";
import PoliticaPrivacidade from "../../../Termos/PoliticaPrivacidade/PoliticaPrivacidade";
import { useState } from "react";
import { estilos } from "../../../estilos";
import { estilosMenus } from "./estilos/estilosMenus"

export default function MenuPoliticaPrivacidade() {
    const [modalVisibilidade, setModalVisibilidade] = useState(false)

    return(
        <View>
            <TouchableHighlight
                style={estilosMenus.tituloMenu}
                onPress={() => {setModalVisibilidade(true)}}
            >
                <Text>Política de Privacidade</Text>
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

                <PoliticaPrivacidade/>
            </Modal>
        </View>
    )
}
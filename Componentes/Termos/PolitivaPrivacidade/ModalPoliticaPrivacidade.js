import { Modal, View, StyleSheet, Text, TouchableHighlight } from "react-native";
import PoliticaPrivacidade from "./PoliticaPrivacidade";
import Checkbox from "expo-checkbox";
import { estilos } from "../../estilos";
import { useState } from "react";

export default function ModalPoliticaPrivacidade({modalPoliticaPrivacidade, setModalPoliticaPrivacidade}) {
    const [isTermosAceitos, setIsTermosAceitos] = useState(false)

    return(
        <Modal
            visible={modalPoliticaPrivacidade.visibilidade}
            onRequestClose={() => {setModalPoliticaPrivacidade(prevModalPoliticaPrivacidade => ({
                ...prevModalPoliticaPrivacidade,
                visibilidade: false
            }))}}
        >
            <PoliticaPrivacidade/>

            <View style={estilos.conteinerCheckbox}>
                <Checkbox
                    style={estilos.chb}
                    value={isTermosAceitos}
                    onValueChange={() => {setIsTermosAceitos(prevTermos => !prevTermos)}}
                    color={isTermosAceitos ? 'black' : undefined}
                />

                <Text>Aceito a Política de Privacidade</Text>
            </View>
            
            <TouchableHighlight
                style={[estilos.btn, {alignSelf: 'center'}]}
                onPress={() => {
                    isTermosAceitos ?
                    setModalPoliticaPrivacidade(prevModalPoliticaPrivacidade => ({
                        ...prevModalPoliticaPrivacidade,
                        visibilidade: false
                    })) :

                    alert(
                        'Favor aceitar a Política de Privacidade'
                    )
                }}
            >
                <Text>Fechar</Text>
            </TouchableHighlight>
        </Modal>
    )
}

const estilosTermos = StyleSheet.create({
    btn: {
        flex: 1,
        alignSelf: 'center'
    }
})
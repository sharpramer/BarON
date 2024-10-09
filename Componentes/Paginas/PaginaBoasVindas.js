import { React } from "react";
import { View, Text, TouchableHighlight, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { estilos } from "../estilos";

export default function PaginaBoasVindas({navigation}) {
    return(
        <SafeAreaView style={estilosPaginaBoasVindas.conteiner}>
            <Text>BEM-VINDO</Text>
            <Image
                source={require('../img/logo.png')}
            />
            <View style={estilosPaginaBoasVindas.conteinerBtn}>
                <TouchableHighlight
                    style={[estilos.btn, estilosPaginaBoasVindas.btn]}
                    onPress={() => {
                        navigation.navigate('PaginaLogin')
                    }}
                >
                    <Text style={estilos.txtBtn}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[estilos.btn, estilosPaginaBoasVindas.btn]}
                    onPress={() => {
                        navigation.navigate('PaginaRegistar')
                    }}
                >
                    <Text style={estilos.txtBtn}>Registar</Text>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    )
}

const estilosPaginaBoasVindas = StyleSheet.create({
    conteiner:{
        flex: 1,
        justifyContent: 'space-between' 
    },

    conteinerBtn:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 48,
        marginHorizontal: 24,
    },

    btn:{
        width: 73,
        height: 37,
    },

    btns:{

    },
})
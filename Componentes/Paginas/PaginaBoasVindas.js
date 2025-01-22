import React, {useEffect} from "react"
import { View, Text, TouchableHighlight, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { buscarLocal } from "../Global"
import { estilos } from "../estilos";

export default function PaginaBoasVindas({navigation}) {
    useEffect(() => {
        const carregarPasse = async () => {
          const passeGuardadaUtilizador = await buscarLocal('Passe')
          passeGuardadaUtilizador ? [navigation.navigate('PaginaInicialUtilizador')] : undefined 
        }
        carregarPasse()
    },[])
    
    return(
        <SafeAreaView style={estilosPaginaBoasVindas.conteiner}>
            {/* Imagem logo */}
            {/* <Image
                style={estilosPaginaBoasVindas.imgLogo}
                source={require('../img/logo.png')}
            /> */}

            {/* Texto Título */}
            <Text style={estilosPaginaBoasVindas.txtTitulo}>BEM-VINDO</Text>

            {/* Conteiner botões de registar e login */}
            <View style={estilosPaginaBoasVindas.conteinerBtn}>
                <TouchableHighlight
                    style={[estilos.btn, estilosPaginaBoasVindas.btn]}
                    onPress={() => {
                        navigation.navigate('PaginaLogin')
                    }}
                >
                    <Text style={estilos.txtBtn}>Entrar</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[estilos.btn, estilosPaginaBoasVindas.btn]}
                    onPress={() => {
                        navigation.navigate('PaginaRegistar')
                    }}
                >
                    <Text style={estilos.txtBtn}>Registrar</Text>
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
    
    imgLogo:{
        marginTop: 35,
        marginBottom: -300,
        width: 150,
        height: 150,
        alignSelf: 'center'
    },

    txtTitulo:{
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 24
    },

    conteinerBtn:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 48,
        marginHorizontal: 24,
    },

    btn:{
        width: 78,
        height: 40,
    },
})
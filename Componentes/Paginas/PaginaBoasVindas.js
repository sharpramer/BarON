import React, {useEffect} from "react"
import { View, Text, TouchableHighlight, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { buscarLocal } from "../Global"
import { estilos } from "../estilos";
import MenuEliminar from "./Utilizador/PaginaDefinicoes/MenuEliminar";

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

            {/* Texto Versão fixado no rodapé */}
            <Text style={estilosPaginaBoasVindas.txtVersao}>BETA v1.0.1</Text>

        </SafeAreaView>
    )
}

const estilosPaginaBoasVindas = StyleSheet.create({
    conteiner:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    txtTitulo:{
        marginTop: 60,
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },

    conteinerBtn:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 80,
        width: '60%',
    },

    btn:{
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    txtVersao:{
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        color: 'gray',
        fontSize: 12,
    },
});

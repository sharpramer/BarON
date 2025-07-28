import { StyleSheet } from "react-native"

export const estilos = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },

    cabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    conteinerCheckbox:{
        flexDirection:"row",
    },

    chb:{
        marginRight: 8,
        marginLeft: 14
    },

    txtCabecalhoTitulo: {
        fontSize: 10,
        textAlign: 'center'
    },

    txtCabecalhoSubtitulo: {
        fontSize: 9,
        textAlign: 'center'
    },

    btnFechar: {
        width: 30,
        height: 30,
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'red',
        borderRadius: 5,
    },

    btn: {
        marginTop: 15,
        width: 70, 
        backgroundColor: '#0DE2E9',
        padding: 7,
        borderRadius: 9,
        justifyContent: 'center'
    },

    txtBtn:{
        textAlign: "center",
    },

    cx:{
        color: 'black',
        textAlign: "center"
    },

    separadorCx: {
        width: 120,
        marginBottom: 15,
        backgroundColor: "#0DE2E9;",
        borderWidth: 3,
        borderColor: "#0DE2E9",
        borderRadius: 5,
    },

    conteinerModoEscuro: {
        height: '100%',
        backgroundColor: '#2b2b2b',
    },

    conteinerModoClaro: {
        height: '100%',
        backgroundColor: 'white',
    },

    modoEscuro: {
        color: 'white'
    },

    modoClaro: {
        backgroundColor: 'white',
        color: 'black'
    },
});

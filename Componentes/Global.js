import { StyleSheet } from "react-native"

export default class Utilizador{
    static nome = ''
    static dataNascimento = ''
    static codigo = ''
    static email = ''
    static passe = ''
}

export class Funcionario{
    static nome = ''
    static dataNascimento = ''
    static codigo = ''
    static email = ''
    static passe = ''
}

export const estilos = StyleSheet.create({
    conteiner:{ // Estilo do aplicativo
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
    },

    btnFechar: {
        width: 30,
        height: 30,
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e80e0e',
        borderRadius: 5,
    },

    cx:{
        textAlign: "center"
    },

    separadorCx:{
        width: 120,
        marginBottom: 15,
        backgroundColor: "#0f73d1",
        borderWidth: 3,
        borderColor: "#0f73d1",
        borderRadius: 5
    },
})
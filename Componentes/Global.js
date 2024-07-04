import React from "react"
import { StyleSheet } from "react-native"

export default class Utilizador{
    static nome = ''
    static dataNascimento = ''
    static numero = ''
    static email = ''
    static passe = ''
}

export class Funcionario{
    static nome = ''
    static dataNascimento = ''
    static numero = ''
    static email = ''
    static passe = ''
}

export const estilos = StyleSheet.create({
    btnFechar: {
        width: 30,
        height: 30,
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e80e0e',
        borderRadius: 5,
    }
})
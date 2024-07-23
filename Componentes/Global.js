import AsyncStorage from "@react-native-async-storage/async-storage"
import { StyleSheet } from "react-native"
import { estilos } from "./estilos"

export default class Utilizador{
    static nome = ''
    static dataNascimento = ''
    static codigo = ''
    static email = ''
    static passe = ''
    static aparencia = ''
}

export class Funcionario{
    static nome = ''
    static dataNascimento = ''
    static codigo = ''
    static email = ''
    static passe = ''
}

export function MudarAparenciaConteinerUtilizador() {
    return Utilizador.aparencia === 'claro' ? estilos.conteinerModoClaro : estilos.conteinerModoEscuro 
}

export function MudarAparenciaTextoUtilizador() {
    return Utilizador.aparencia === 'claro' ? estilos.modoClaro : estilos.modoEscuro 
}

export const guardarLocal = (chave, valor) => {
    try {
        AsyncStorage.setItem(chave,valor)
        console.log(`Guardado com sucesso o valor: ${valor} na chave: ${chave}`)
    } catch (erro) {
        console.log(`Erro ao guardar: ${erro}`)
    }
}

export function buscarLocal(chave){
    try {
        const valor = AsyncStorage.getItem(chave)
        return valor
    } catch (erro) {
        console.log(`Erro ao buscar: ${erro}`)
    }
}

export async function apagarLocal(chave){
    try {
        const valor = await AsyncStorage.removeItem(chave)
        console.log("Eliminado com sucesso")
        return valor
    } catch (erro) {
        console.log(`Erro ao buscar: ${erro}`)
    }
}

export async function buscarTudoLocal(){
    try {
        const valor = await AsyncStorage.getAllKeys()
        console.log(valor)
        return valor
    } catch (erro) {
        console.log(`Erro ao buscar: ${erro}`)
    }
}
import AsyncStorage from "@react-native-async-storage/async-storage"
import { collection, addDoc } from "firebase/firestore";
import { bd } from "../firebase";
import { estilos } from "./estilos"
import { PhoneAuthProvider, multiFactor, } from 'firebase/auth';
import { useEffect } from "react";

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

export function adicionarBd(nomeColecao, dado) {
    const docRef = collection(bd, nomeColecao)
    addDoc(docRef, {
        dado
    })
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
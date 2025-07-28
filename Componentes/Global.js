import AsyncStorage from "@react-native-async-storage/async-storage"
import { auth, bd } from "../firebase"
import { collection, addDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
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


export function adicionarBd(nomeColecao, dado) {
    const docRef = collection(bd, nomeColecao)
    addDoc(docRef, dado)
}

export const eliminarFirestore = async (nomeColecao, dado) => {
    try {
        await deleteDoc(doc(bd, nomeColecao, dado))
        alert('Eliminado com sucesso')      
    } catch (erro) {
        console.error('Erro ao eliminar documento')
    }
}

export async function buscarValorFirestore(nomeColecao, campo, valor) {
    try {
        const linha = await getDocs(query(
            collection(bd, nomeColecao),
            where(campo, '==', valor)
        ))

        if (!linha.empty) {
            const dados = linha.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            return dados[0]
        }

    } catch (erro) {
        console.error(`Erro ao buscar documento: ${erro}`)
        Alert('Erro ao boscar documento')
    }
}

export async function buscarDocumentoFirestore(nomeColecao,) {
    try {
        const linha = await getDocs(
            collection(bd, nomeColecao),
        )

        if (!linha.empty) {
            const dados = linha.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            return dados[0]
        }

    } catch (erro) {
        console.error(`Erro ao buscar documento: ${erro}`)
        Alert('Erro ao boscar documento')
    }
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

export const fazerLogout = async(navegacao) => {
    try {
      await auth.signOut()
      await apagarLocal("Passe")
      
      alert('Saiu com sucesso')

      // Reseta a navegação e redireciona para a tela de login
      navegacao.reset({
        index: 0, // Zera o histórico de navegação
        routes: [{ name: 'PaginaLogin' }], // Redireciona para a tela de login
      })
    } catch (erro) {
      console.error("Erro ao realizar logout:", erro.message)
      alert(`Erro ao sair: ${erro.message}`)
    }
}
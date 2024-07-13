import { StyleSheet } from "react-native"

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

export const estilos = StyleSheet.create({
    conteiner:{ // Estilo do aplicativo
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    
    conteinerModoEscuro:{
        height: '100%',
        backgroundColor: '#2b2b2b',
    },

    conteinerModoClaro:{
        height: '100%',
        backgroundColor: 'white',
    },

    modoEscuro:{
        color: 'white'
    },

    modoClaro:{
        backgroundColor: 'white',
        color: 'black'
    },
})

export function MudarAparenciaConteinerUtilizador() {
    return Utilizador.aparencia === 'claro' ? estilos.conteinerModoClaro : estilos.conteinerModoEscuro 
}

export function MudarAparenciaTextoUtilizador() {
    return Utilizador.aparencia === 'claro' ? estilos.modoClaro : estilos.modoEscuro 
}
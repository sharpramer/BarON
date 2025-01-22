import React, { useState } from "react"
import { View, Text, TouchableHighlight, Image, FlatList, StyleSheet, Modal, SafeAreaView } from "react-native"
import FazerPedido from "./FazerPedido"

const produtosArray = [
    { 
        id: 1, 
        imagem: require("./img/a-la-minuta-no-pao.jpeg"), 
        precoVenda: '20,00', 
        precoCusto: '0,80', 
        descricao: 'Sumo de laranja natural', 
        produto: 'A la minuta no pão' 
    },

    
    { 
        id: 2, 
        imagem: require("./img/salada-italiana.png"), 
        precoVenda: '30,00',  
        precoCusto: '30,00', 
        descricao: 'Salada italiana', 
        produto: 'Salada italiana'
    },
    
    { 
        id: 3, 
        imagem: require("./img/salada-japonesa.png"), 
        precoVenda: '18,00',  
        precoCusto: '18,00', 
        descricao: 'Pão com queijo e fiambre na chapa', 
        produto: 'Salada japonesa' 
    },
    
    { 
        id: 4, 
        imagem: require("./img/salada.png"), 
        precoVenda: '17,00',  
        precoCusto: '17,00', 
        descricao: 'Salada', 
        produto: 'Salada Mineira'
    },

    { 
        id: 5, 
        imagem: require("./img/salada2.jpeg"), 
        precoVenda: '15,00', 
        precoCusto: '15,00', 
        descricao: 'Sumo de laranja natural', 
        produto: 'Salada Vegana' 
    }

]

export default function Produtos() {
    const [modalVisibilidade, setModalVisibilidade] = useState(false)
    const [produtoSelecionado, setProdutoSelecionado] = useState(null)
    
    const renderItem = ({ item }) => {
        return (
            <View key={item.id} style={estilos.conteudoConteiner}>
                <TouchableHighlight onPress={() => {
                    setProdutoSelecionado(item)
                    setModalVisibilidade(true)
                }}>
                    <Image 
                        source={item.imagem} 
                        style={estilos.ImagemProduto}
                    />
                </TouchableHighlight>
                <Text style={estilos.txtPrecoProduto}>R$ {item.precoVenda}</Text>
                <Text style={estilos.txtNomeProduto}>{item.produto}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView>
            {/* Lista dos produtos */}
            <FlatList
                style={estilos.produtosTabela}
                data={produtosArray}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
            />

            <FazerPedido modalVisibilidade={modalVisibilidade} produtoSelecionado={produtoSelecionado} setModalVisibilidade={setModalVisibilidade}/>
        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    produtosTabela: {
        marginTop: 40,
    },

    ImagemProduto: {
        width: 130,
        height: 130,
        marginTop: 20 
    },

    conteudoConteiner: {
        flex: 1,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
    },
        
    conteudoModalConteiner: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
            
    btnFecharModal: {
        width: 30,
        height: 30,
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e80e0e',
        borderRadius: 5,
    },

    txtBtnFecharModal: {
        color: 'black',
    },

    txtPrecoProduto: {
        margin: 2,
        marginTop: 5,
        color: "red",
        fontWeight: 'bold',
        fontSize: 15
    },
})
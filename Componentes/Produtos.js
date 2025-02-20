import React, { useState } from "react"
import { View, Text, TouchableHighlight, Image, FlatList, StyleSheet, SafeAreaView } from "react-native"
import FazerPedido from "./FazerPedido/FazerPedido.js"

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
            <View key={item.id} style={estilosProdutos.conteudoConteiner}>
                <TouchableHighlight 
                    style={estilosProdutos.btnConteiner}
                    onPress={() => {
                        setProdutoSelecionado(item)
                        setModalVisibilidade(true)
                    }}
                >
                    <View>
                        <Image 
                            source={item.imagem} 
                            style={estilosProdutos.ImagemProduto}
                        />

                        <Text style={estilosProdutos.txtNomeProduto}>{item.produto}</Text>
                        <Text style={estilosProdutos.txtPrecoProduto}>R$ {item.precoVenda}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    return (
        <SafeAreaView>
            {/* Lista dos produtos */}
            <FlatList
                style={estilosProdutos.produtosTabela}
                data={produtosArray}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
            />

            <FazerPedido modalVisibilidade={modalVisibilidade} produtoSelecionado={produtoSelecionado} setModalVisibilidade={setModalVisibilidade}/>
        </SafeAreaView>
    )
}

const estilosProdutos = StyleSheet.create({
    conteudoConteiner: {
        flex: 1,
        margin: 5,
        //justifyContent: "center",
        //alignItems: "center",
    },

    btnConteiner:{
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 25,
        alignSelf: 'flex-start'
    },
        
    ImagemProduto: {
        width: 130,
        height: 130,
        marginTop: 10,
        borderRadius: 18
    },

    txtNomeProduto: {
        fontSize: 15,
        marginTop: 8,
        marginVertical: 5,
        color: "black",
        fontWeight: 'bold',
    },
    
    txtPrecoProduto: {
        color: "black",
        fontWeight: 500,
        fontSize: 14
    },

    produtosTabela: {
        marginTop: 40,
        marginHorizontal: 19,
    },
})
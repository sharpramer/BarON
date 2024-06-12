import React, { useState } from "react"
import { View, Text, TouchableHighlight, Image, FlatList, StyleSheet, Modal, SafeAreaView } from "react-native"

const produtosArray = [
    { id: 1, imagem: require("./img/sumo-laranja.png"), preco: '1,00€', nome: 'Sumo de laranja' },
    { id: 2, imagem: require("./img/risoles.jpg"), preco: '1,20€', nome: 'Risoles' },
    { id: 3, imagem: require("./img/tosta-mista.png"), preco: '1,60€', nome: 'Tosta mista' },
    { id: 4, imagem: require("./img/coxinha.png"), preco: '2,00€', nome: 'Coxinha' }
];

function getImagemId(id) {
    const produto = produtosArray.find(produto => produto.id === id)
    if (produto) {
        console.log(`Imagem do produto: ${produto.imagem}`)
        return produto.imagem
    } else {
        console.log(`Produto com id ${id}, não encontrado.`)
        return null
    }
}

export default function Produtos() {
    const [modalVisibilidade, setModalVisibilidade] = useState(false)
    const [produtoSelecionado, setProdutoSelecionado] = useState(null)
    const [quantidadePedido, setQuantidadePedido] = useState(1)
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
                <Text>{item.preco}</Text>
                <Text>{item.nome}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <FlatList
                style={estilos.produtosTabela}
                data={produtosArray}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
            />

            <Modal
                visible={modalVisibilidade}
                onRequestClose={() => setModalVisibilidade(false)}
            >
                <SafeAreaView style={estilos.conteudoModalConteiner}>
                    <TouchableHighlight // Botão fechar modal
                        onPress={() => setModalVisibilidade(false)}
                        style={estilos.fecharBotao}
                    >
                        <Text style={estilos.txtBtnFecharModal}>X</Text>
                    </TouchableHighlight>

                    { produtoSelecionado && (
                        <View>
                            <Image
                                source={produtoSelecionado.imagem} 
                            />

                            <Text>{produtoSelecionado.preco}</Text>
                            <Text>Preço com IVA incluído</Text>
                            
                            <Text>Quantidade</Text>
                            <View>
                                <TouchableHighlight
                                    style={{backgroundColor: "black"}}
                                    onPress={() => {
                                        if (quantidadePedido > 1) {
                                            setQuantidadePedido(prevQuantidade => prevQuantidade = prevQuantidade - 1)
                                            console.log(quantidadePedido)
                                        }
                                    }}
                                >
                                    <Text style={{color: "white", alignSelf:"center"}}>-</Text>
                                </TouchableHighlight>

                                <Text style={{color: "black", alignSelf:"center"}}>{quantidadePedido}</Text>

                                <TouchableHighlight
                                    style={{backgroundColor: "black"}}
                                    onPress={() => {
                                        setQuantidadePedido(prevQuantidade => prevQuantidade = prevQuantidade + 1)
                                        console.log(quantidadePedido)
                                    }}
                                >
                                    <Text style={{color:"white", alignSelf:"center"}}>+</Text>
                                </TouchableHighlight>
                            </View>
                            <View>
                                <TouchableHighlight
                                    onPress={() => alert("Pedido adicionada ao carrinho!")}
                                >
                                    <Text>Carrinho</Text>
                                </TouchableHighlight>

                                <TouchableHighlight
                                    onPress={() => alert("Pedido reservado com sucesso!")}
                                >
                                    <Text>Reservar</Text>
                                </TouchableHighlight>
                                </View>
                        </View>
                    )}
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    produtosTabela: {
        marginTop: 20,
    },

    ImagemProduto: {
        width: 200,
        height: 200,
    },

    fecharBotao: {
        marginTop: 20,
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
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
        justifyContent: 'center',
        alignItems: 'center',
    },

    txtBtnFecharModal: {
        color: 'black',
    },

});

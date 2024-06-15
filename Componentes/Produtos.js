import React, { useState } from "react"
import { View, Text, TouchableHighlight, Image, FlatList, StyleSheet, Modal, SafeAreaView } from "react-native"

const produtosArray = [
    { id: 1, imagem: require("./img/sumo-laranja.png"), preco: '1,00', nome: 'Sumo de laranja' },
    { id: 2, imagem: require("./img/risoles.jpg"), preco: '1,20', nome: 'Risoles' },
    { id: 3, imagem: require("./img/tosta-mista.png"), preco: '1,60', nome: 'Tosta mista' },
    { id: 4, imagem: require("./img/coxinha.png"), preco: '2,00', nome: 'Coxinha' }
];

function converterPrecoParaFloat(preco) {
    // Substitui a vírgula por ponto
    const precoFormatado = preco.replace(',', '.');
    return parseFloat(precoFormatado);
}

function formatarFloat(numero) {
    return numero.toFixed(2).replace('.', ',');
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
                <Text style={estilos.txtPrecoProduto}>{item.preco}€</Text>
                <Text style={estilos.txtNomeProduto}>{item.nome}</Text>
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
                <View style={estilos.conteudoModalConteiner}>
                    <TouchableHighlight // Botão fechar modal
                        onPress={() => setModalVisibilidade(false)}
                        style={estilos.btnFecharModal}
                    >
                        <Text style={estilos.txtBtnFecharModal}>X</Text>
                    </TouchableHighlight>

                    { produtoSelecionado && (
                        <View>
                            <Image
                                source={produtoSelecionado.imagem} 
                            />

                            {/* Texto preço produto */}
                            <Text style={{alignSelf: "center"}}>
                                {formatarFloat(converterPrecoParaFloat(produtoSelecionado.preco) * quantidadePedido)}€
                            </Text>
                            
                            <Text>Preço com IVA incluído</Text>
                            
                            <Text>Quantidade</Text>
                            <View>
                                <TouchableHighlight // Botão diminuir quantidade pedido
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

                                {/* Texto quantidade pedido */}
                                <Text style={{color: "black", alignSelf:"center"}}>{quantidadePedido}</Text>

                                <TouchableHighlight // Botão aumentar quantidade pedido
                                    style={{backgroundColor: "black"}}
                                    onPress={() => {
                                        setQuantidadePedido(prevQuantidade => prevQuantidade = prevQuantidade + 1)
                                        console.log(quantidadePedido)
                                    }}
                                >
                                    <Text style={{color:"white", alignSelf:"center"}}>+</Text>
                                </TouchableHighlight>
                            </View>

                            {/* Conteiner para adicionar o pedido ao carrinho ou para reservar o pedido */}
                            <View>
                                <TouchableHighlight // Botão adicionar pedido ao carrinho
                                    onPress={() => {alert("Pedido adicionada ao carrinho!")}}
                                >
                                    <Text>Carrinho</Text>
                                </TouchableHighlight>

                                <TouchableHighlight // Botão reservar pedido
                                    onPress={() => alert("Pedido reservado com sucesso!")}
                                >
                                    <Text>Reservar</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    );
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

    txtNomeProduto: {
        
    }
});

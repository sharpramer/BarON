import React, { useState } from "react"
import { View, Text, TouchableHighlight, Image, FlatList, StyleSheet, Modal, SafeAreaView } from "react-native"
import FazerPedido from "./FazerPedido";

const produtosArray = [
    { id: 1, imagem: require("./img/sumo-laranja.png"), precoVenda: '1,00', precoCusto: '0,80', descricao: 'Sumo de laranja natural', nome: 'Sumo de laranja' },
    { id: 2, imagem: require("./img/risoles.jpg"), precoVenda: '1,20',  precoCusto: '1,00', descricao: 'Risoles de carne de boi', nome: 'Risoles' },
    { id: 3, imagem: require("./img/tosta-mista.png"), precoVenda: '1,60',  precoCusto: '1,20', descricao: 'Pão com queijo e fiambre na chapa', nome: 'Tosta mista' },
    { id: 4, imagem: require("./img/coxinha.png"), precoVenda: '2,00',  precoCusto: '1,30', descricao: 'Coxinha com queijo', nome: 'Coxinha' }
];

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
                <Text style={estilos.txtPrecoProduto}>{item.precoVenda}€</Text>
                <Text style={estilos.txtNomeProduto}>{item.nome}</Text>
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
})
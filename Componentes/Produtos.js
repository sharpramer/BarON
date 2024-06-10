import React, { useState } from "react";
import { View, Text, TouchableHighlight, Image, FlatList, StyleSheet, Modal } from "react-native";

const produtos = [
    { id: '1', imagem: require("./img/sumo-laranja.png"), preco: '1,00€', nome: 'Sumo de laranja' },
    { id: '2', imagem: require("./img/risoles.jpg"), preco: '1,20€', nome: 'Risoles' },
    { id: '3', imagem: require("./img/tosta-mista.png"), preco: '1,60€', nome: 'Tosta mista' },
    { id: '4', imagem: require("./img/coxinha.png"), preco: '2,00€', nome: 'Coxinha' }
];

export default function Produtos() {
    const [modalVisibilidade, setModalVisibilidade] = useState(false);

    // Log para verificar se as imagens são resolvidas corretamente
    produtos.forEach(produto => {
        const resolved = Image.resolveAssetSource(produto.imagem);
        console.log('Resolved imagem:', resolved);
    });

    const renderItem = ({ item }) => {
        return (
            <View key={item.id} style={estilos.conteudoConteiner}>
                <TouchableHighlight onPress={() => setModalVisibilidade(true)}>
                    <Image 
                        source={item.imagem} 
                        style={estilos.ImagemProduto} 
                        onError={(error) => console.error('Erro ao renderizar imagem:', error.nativeEvent.error)} 
                    />
                </TouchableHighlight>
                <Text>{item.preco}</Text>
                <Text>{item.nome}</Text>
            </View>
        );
    };

    return (
        <View>
            <FlatList
                style={estilos.produtosTabela}
                data={produtos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
            />
            <Modal
                transparent={true}
                visible={modalVisibilidade}
                onRequestClose={() => setModalVisibilidade(false)}
            >
                <View style={estilos.conteudoModalConteiner}>
                    <Text style={{ color: 'black' }}>Teste modal</Text>
                    <TouchableHighlight
                        onPress={() => setModalVisibilidade(false)}
                        style={estilos.fecharBotao}
                    >
                        <Text style={estilos.buttonText}>Fechar</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
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
    buttonText: {
        color: 'black',
    },
});

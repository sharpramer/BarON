import React, { useState } from "react"
import { View, Text, TouchableHighlight, Image, FlatList, StyleSheet, SafeAreaView } from "react-native"
import FazerPedido from "./FazerPedido/FazerPedido.js"
import { TouchableWithoutFeedback } from "react-native"

const produtosArray = [

    { 
        id: 1, 
        imagem: require("./img/salada-italiana.png"), 
        precoVenda: '29,00',  
        precoCusto: '30,00', 
        descricao: 'Alface crespa, alface roxa, Rúcula, Manjericão, Berinjela em compota (caponata), Mussarela de búfala, Tomate grape, Pepperoni fatiado', 
        produto: 'Salada italiana'
    },
    
    
    { 
        id: 2, 
        imagem: require("./img/salada.png"), 
        precoVenda: '31,00',  
        precoCusto: '17,00', 
        descricao: 'Alface americana, alface crespa, couve, carne seca, queijo minas, cebolinha, tomate e alho crocante',
        produto: 'Salada Mineira'
    },

    { 
        id: 3, 
        imagem: require("./img/salada2.jpeg"), 
        precoVenda: '28,00', 
        precoCusto: '15,00', 
        descricao: 'Alface crespa, americana, Cenoura ralada crua, Camarão cozido, Cream cheese, Kani, Gergelim salpicado, Cebolinha picada.', 
        produto: 'Salada Vegana' 
    },

    { 
        id: 4, 
        imagem: require("./img/bife-a-cavalo.png"), 
        precoVenda: '36,90',
        precoCusto: '15,00', 
        descricao: 'Arroz, feijão, bife de gado, ovo, e batata frita.', 
        produto: 'Bife a cavalo' 
    },

    { 
        id: 5, 
        imagem: require("./img/frango-grelhado.png"), 
        precoVenda: '35,90', 
        precoCusto: '15,00', 
        descricao: 'Arroz, feijão, frango grelhado e batata frita.',
        produto: 'Frango grelhado' 
    },

    { 
        id: 6, 
        imagem: require("./img/parmegiana-carne.png"), 
        precoVenda: '38,90', 
        precoCusto: '15,00', 
        descricao: 'Arroz, bife de gado, queijo, molho e batata frita.', 
        produto: 'Parmegiana de carne' 
    },
]

function formatarFloat(numero) {
    return numero.toFixed(2).replace('.', ',')
}


export default function Produtos() {
    const [modalVisibilidade, setModalVisibilidade] = useState(false)
    const [produtoSelecionado, setProdutoSelecionado] = useState(null)
    
    const renderItem = ({ item }) => {

        return (
            <View 
                key={item.id} 
                style={estilosProdutos.conteudoConteiner}
            >
                <TouchableHighlight 
                    style={estilosProdutos.btnConteiner}
                    onPress={() => {
                        const precoOriginal = parseFloat(item.precoVenda.replace(',', '.'));
                        const precoDescontado = formatarFloat(precoOriginal * 0.8);

                        setProdutoSelecionado({
                            ...item,
                            precoDescontado: precoDescontado
                        })
                        setModalVisibilidade(true)
                    }}
                >
                    <View>
                        <View>
                            <TouchableWithoutFeedback
                                onPress={() => {alert(item.descricao)}}
                            >
                                <Image
                                    source={require('./img/info.png')}
                                />
                            </TouchableWithoutFeedback>
                            <Image 
                                source={item.imagem} 
                                style={estilosProdutos.ImagemProduto}
                            />
                        </View>

                        <Text style={estilosProdutos.txtNomeProduto}>{item.produto}</Text>
                        <Text style={estilosProdutos.txtPrecoProduto}>R$ {item.precoVenda}</Text>
                        <Text style={estilosProdutos.txtPrecoProdutoDescontado}>
                            R$ {formatarFloat(parseFloat(item.precoVenda.replace(',', '.')) * 0.8)}
                        </Text>
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

            <FazerPedido 
                modalVisibilidade={modalVisibilidade} 
                produtoSelecionado={produtoSelecionado} 
                setModalVisibilidade={setModalVisibilidade}
            />
        </SafeAreaView>
    )
}

const estilosProdutos = StyleSheet.create({
    conteudoConteiner: {
        flex: 1,
        margin: 5,
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
        color: "gray",
        textDecorationLine: 'line-through',
        fontWeight: 350,
        fontSize: 13
    },

    txtPrecoProdutoDescontado: {
        color: "black",
        fontWeight: 500,
        fontSize: 15
    },

    produtosTabela: {
        marginTop: 40,
        marginHorizontal: 19,
    },
})
import React from "react";
import { View, Text, TouchableHighlight, Image, FlatList } from "react-native";

const produtos = [
    { id: '1', imagem: require("./img/suco-laranja.png"), preco: '1,00€', nome: 'Sumo de laranja' },
    { id: '2', imagem: require("./img/tosta-mista.png"), preco: '1,20€', nome: 'Tosta Mista' },
    { id: '3', imagem: require("./img/risoles.jpg"), preco: '1,60€', nome: 'Risoles' },
    { id: '4', imagem: require("./img/coxinha.png"), preco: '2,00€', nome: 'Coxinha' }
]

export default function Produtos() {
    return (
        <FlatList
            data={produtos}
            renderItem={({item}) => {
                return( 
                    <TouchableHighlight key={item.id}>
                        <View style={{ flex: 1, margin: 5 }}>
                            <Image source={item.imagem} style={{width: '100%', height:100}} />
                            <Text>{item.preco}</Text>
                            <Text>{item.nome}</Text>
                        </View>
                    </TouchableHighlight>
                )
            }}
            keyExtractor={item => item.id}
            numColumns={2}
        />
    );
}

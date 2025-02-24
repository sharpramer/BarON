import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableHighlight, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, bd } from "../firebase";
import { eliminarFirestore } from "./Global";

export default function Pedidos(props) {
  const [dadosPedido, setDadosPedido] = useState([]);
  const [opcoesPedidoVisibilidade, setopcoesPedidoVisibilidade] = useState({});

  useEffect(() => {
    const obterPedido = async () => {
      try {
        const utilizadorAtual = auth.currentUser;
        const pedidosRef = await getDocs(collection(bd, 'Pedidos'));

        const dadosPedidos = await Promise.all(
          pedidosRef.docs.map(async (doc) => {
            const dadosPedido = {
              id: doc.id,
              dataEntrega: doc.data().data_entrega,
              horaEntrega: doc.data().hora_entrega,
            };

            if (props.tipoConta === 'utilizador') {
              const itensPedidosLinha = query(
                collection(doc.ref, 'itens_pedido'),
                where('situacao', '==', props.situacao),
                where('codigo_utilizador', '==', utilizadorAtual.uid)
              );
              
              const itensPedidosRef = await getDocs(itensPedidosLinha);
  
              const dadosItensPedios = itensPedidosRef.docs.map(itemDoc => ({
                id: itemDoc.id,
                nomeCurto: itemDoc.data().nome_curto,
                subtotal: itemDoc.data().subtotal,
                quantidade: itemDoc.data().quantidade,
                precoVenda: itemDoc.data().preco_venda,
              }));
  
              if (dadosItensPedios.length > 0) {
                return { ...dadosPedido, itensPedido: dadosItensPedios };
              }
              return null;
            } else {
              const itensPedidosLinha = query(
                collection(doc.ref, 'itens_pedido'),
                where('situacao', '==', props.situacao)
              );
              const itensPedidosRef = await getDocs(itensPedidosLinha);
  
              const dadosItensPedios = itensPedidosRef.docs.map(itemDoc => ({
                id: itemDoc.id,
                nomeCurto: itemDoc.data().nome_curto,
                subtotal: itemDoc.data().subtotal,
                quantidade: itemDoc.data().quantidade,
                precoVenda: itemDoc.data().preco_venda,
              }));
  
              if (dadosItensPedios.length > 0) {
                return { ...dadosPedido, itensPedido: dadosItensPedios };
              }
              return null;
            }
          })
        );

        setDadosPedido(dadosPedidos.filter(pedido => pedido !== null));
      } catch (erro) {
        console.error('Erro ao obter documento: ', erro);
      }
    };

    obterPedido();
  }, []);

  const alternarVisibilidadeOpcaoPedido = produtoId => {
    setopcoesPedidoVisibilidade(prevState => ({
      ...prevState,
      [produtoId]: !prevState[produtoId]
    }));
  };

  return(
    <SafeAreaView>
      <FlatList
        data={dadosPedido}
        renderItem={({ item }) => (
          <View style={estilos.conteinerPedido}>
            {item.itensPedido.map((produto) => (
              <View key={produto.id}>
                <TouchableOpacity 
                  style={estilos.conteinerConteudo}
                  onPress={() => alternarVisibilidadeOpcaoPedido(produto.id)}
                >
                  <Image
                    style={estilos.imagemProduto}
                    source={require('./img/salada.png')}
                  />

                  <View style={estilos.infoConteiner}>
                    <Text style={estilos.nomeProduto}>{produto.nomeCurto}</Text>
                    <Text style={estilos.detalhes}>
                      Entrega: {item.dataEntrega} às {item.horaEntrega}
                    </Text>
                    <Text style={estilos.detalhes}>Quantidade: {produto.quantidade}</Text>
                    <Text style={estilos.detalhes}>Total: R$ {produto.subtotal}</Text>
                  </View>
                </TouchableOpacity>

                { opcoesPedidoVisibilidade[produto.id] && ( 
                  <View style={estilos.opcoesConteiner}>
                    <TouchableHighlight
                      style={estilos.botaoEliminar}
                      onPress={() => {
                        eliminarFirestore('Pedidos', item.id)
                      }}
                    >
                      <Text style={estilos.textoBotaoEliminar}>Eliminar</Text>
                    </TouchableHighlight>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
  conteinerPedido:{
    flex: 1,
    margin: 8,
    flexDirection: 'column'
  },

  conteinerConteudo:{
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },

  imagemProduto: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },

  infoConteiner:{
    flex: 1,
    justifyContent: 'space-between',
  },

  nomeProduto:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },

  detalhes:{
    fontSize: 14,
    color: '#636262',
  },

  opcoesConteiner:{
    marginTop: 10,
    alignItems: "center",
    width: 'auto'
  },

  botaoEliminar:{
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 150,
    borderRadius: 8,
  },

  textoBotaoEliminar:{
    fontSize: 16,
    fontWeight: 'bold'
  }
})
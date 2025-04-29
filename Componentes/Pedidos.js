import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, TouchableHighlight, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore" 
import { auth, bd } from "../firebase"

export default function Pedidos(props) {
  const [dadosPedido, setDadosPedido] = useState([])
  const [opcoesPedidoVisibilidade, setOpcoesPedidoVisibilidade] = useState({})
  const [recarregar, setRecarregar] = useState(false)

  useEffect(() => {
    obterPedido()
  }, [])

  const aoAtualizar = async () => {
    setRecarregar(true)
    await obterPedido()
    setRecarregar(false)
  }
  
  const obterPedido = async () => {
    try {
      const utilizadorAtual = auth.currentUser
      const pedidosRef = await getDocs(collection(bd, 'Pedidos'))

      const dadosPedidos = await Promise.all(
        pedidosRef.docs.map(async (doc) => {
          const dadosPedido = {
            id: doc.id,
            dataEntrega: doc.data().data_entrega,
            horaEntrega: doc.data().hora_entrega,
            nomeUtilizador: doc.data().nome_utilizador
          }

          if (props.tipoConta === 'utilizador') {
            const itensPedidosLinha = query(
              collection(doc.ref, 'itens_pedido'),
              where('situacao', '==', props.situacao),
              where('codigo_utilizador', '==', utilizadorAtual.uid)
            )
            
            const itensPedidosRef = await getDocs(itensPedidosLinha)

            const dadosItensPedios = itensPedidosRef.docs.map(itemDoc => ({
              id: itemDoc.id,
              nomeCurto: itemDoc.data().nome_curto,
              subtotal: itemDoc.data().subtotal,
              quantidade: itemDoc.data().quantidade,
              precoVenda: itemDoc.data().preco_venda,
              troco: itemDoc.data().troco,
              localEntrega: itemDoc.data().localEntrega,
              telefone: itemDoc.data().telefone
            }))

            if (dadosItensPedios.length > 0) {
              return { ...dadosPedido, itensPedido: dadosItensPedios }
            }
            return null
          } else {
            const itensPedidosLinha = query(
              collection(doc.ref, 'itens_pedido'),
              where('situacao', '==', props.situacao)
            )
            const itensPedidosRef = await getDocs(itensPedidosLinha)

            const dadosItensPedios = itensPedidosRef.docs.map(itemDoc => ({
              id: itemDoc.id,
              nomeCurto: itemDoc.data().nome_curto,
              subtotal: itemDoc.data().subtotal,
              quantidade: itemDoc.data().quantidade,
              precoVenda: itemDoc.data().preco_venda,
              troco: itemDoc.data().troco,
              localEntrega: itemDoc.data().localEntrega,
              telefone: itemDoc.data().telefone
            }))

            if (dadosItensPedios.length > 0) {
              return { ...dadosPedido, itensPedido: dadosItensPedios }
            }
            return null
          }
        })
      )

      setDadosPedido(dadosPedidos.filter(pedido => pedido !== null))
    } catch (erro) {
      console.error('Erro ao obter documento: ', erro)
    }
  }


  const alternarVisibilidadeOpcaoPedido = produtoId => {
    setOpcoesPedidoVisibilidade(prevState => ({
      ...prevState,
      [produtoId]: !prevState[produtoId]
    }))
  }

  const eliminarPedido = async pedidoId => {
    try {
      const itensSnapshot = await getDocs(collection(bd, `Pedidos/${pedidoId}/itens_pedido`))
      const promises = itensSnapshot.docs.map(doc => deleteDoc(doc.ref))
      await Promise.all(promises)

      await deleteDoc(doc(bd, 'Pedidos', pedidoId))
      console.log('Eliminado com sucesso!')
      alert('Eliminado com sucesso!')
    } catch (erro) {
      console.error("Erro ao eliminar pedido com itens: ", erro)
    }
  }

  return(
    <SafeAreaView>
      <FlatList
        data={dadosPedido}
        refreshing={recarregar}
        onRefresh={aoAtualizar}
        renderItem={({ item }) => (
          <View style={estilos.conteinerPedido}>
            {item.itensPedido.map((itens_pedido) => (
              <View key={itens_pedido.id}>
                <TouchableOpacity 
                  style={estilos.conteinerConteudo}
                  onPress={() => alternarVisibilidadeOpcaoPedido(itens_pedido.id)}
                >

                  <View style={estilos.infoConteiner}>
                    <Text style={estilos.nomeProduto}>{itens_pedido.nomeCurto}</Text>
                    
                    <Text style={estilos.nomeUtilizador}>Nome: {item.nomeUtilizador}</Text>
                    
                    <Text style={estilos.detalhes}>
                      Entrega: {item.dataEntrega} às {item.horaEntrega}
                    </Text>
                    <Text style={estilos.detalhes}>
                      No local: {itens_pedido.localEntrega}
                    </Text>
                    
                    <Text style={estilos.detalhes}>Quantidade: {itens_pedido.quantidade}</Text>
                    <Text style={estilos.detalhes}>Total: R$ {itens_pedido.subtotal}</Text>
                    <Text style={estilos.detalhes}>Troco: {itens_pedido.troco}</Text>
                  </View>
                </TouchableOpacity>

                { opcoesPedidoVisibilidade[itens_pedido.id] && ( 
                  <View style={estilos.opcoesConteiner}>
                    { props.tipoConta === 'funcionario' ? 
                    /* Botão finalizar pedido */
                    <TouchableHighlight
                      style={estilos.botaoFinalizar}
                      onPress={async() => {
                        try {
                          const docRef = doc(bd, 'Pedidos', item.id, 'itens_pedido', itens_pedido.id)
                          
                          await updateDoc(docRef, {
                            situacao: 'finalizado'
                          })
                          
                          alert('Finalizado com sucesso')
                        } catch (erro) {
                          console.error(`Erro ao finalizar pedido ${erro}`);
                        }
                      }}
                    >
                      <Text style={estilos.textoBotaoFinalizar}>Finalizar</Text>  
                    </TouchableHighlight>
                      : undefined
                    }

                    {/* Botão eliminar pedido */}
                    <TouchableHighlight
                      style={estilos.botaoEliminar}
                      onPress={() => {
                        eliminarPedido(item.id)
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

  nomeProduto:{
    fontSize: 14,
    fontWeight: 'black',
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
  },

  botaoFinalizar:{
    backgroundColor: 'lightgreen',
    paddingVertical: 10,
    paddingHorizontal: 150,
    borderRadius: 8,
    marginBottom: 10
  },

  textoBotaoFinalizar:{
    fontSize: 16,
    fontWeight: 'bold'
  },
})
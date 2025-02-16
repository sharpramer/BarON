import { collection, getDocs, query, where } from "firebase/firestore"
import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from "react-native"
import { auth, bd } from "../firebase"
import { SafeAreaView } from "react-native-safe-area-context"
import { eliminarFirestore } from "./Global"

export default function Pedidos(props) {
  const [dadosPedido, setDadosPedido] = useState([])

  useEffect(() => {
    // Função para buscar os dados
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
            }

            /* Verifica se a conta logada é do tipo utilizador */
            if (props.tipoConta === 'utilizador') {
              // Mostra somente os pedidos onde a situação é igual a 'reservado' e os pedidos do utilizador igual
              const itensPedidosLinha = query(
                collection(doc.ref, 'itens_pedido'),
                where('situacao', '==', props.situacao),
                where('codigo_utilizador', '==', utilizadorAtual.uid),
              )
              
              const itensPedidosRef = await getDocs(itensPedidosLinha)
  
              // Mapeia apenas os itens que atendem ao filtro
              const dadosItensPedios = itensPedidosRef.docs.map(itemDoc => ({
                id: itemDoc.id,
                nomeCurto: itemDoc.data().nome_curto,
                subtotal: itemDoc.data().subtotal,
                quantidade: itemDoc.data().quantidade,
                precoVenda: itemDoc.data().preco_venda,
              }))
  
              // Apenas adiciona o pedido se houver itens com situacao 'reservado'
              if (dadosItensPedios.length > 0) {
                return { ...dadosPedido, itensPedido: dadosItensPedios }
              }
              return null // Ignora pedidos sem itens reservados
            } 
            
            /* Verifica se a conta logada é do tipo funcionário */
            else {
              // Mostra somente os pedidos onde a situação é igual a 'reservado'
              const itensPedidosLinha = query(
                collection(doc.ref, 'itens_pedido'),
                where('situacao', '==', props.situacao),
              )
              const itensPedidosRef = await getDocs(itensPedidosLinha)
  
              // Mapeia apenas os itens que atendem ao filtro
              const dadosItensPedios = itensPedidosRef.docs.map(itemDoc => ({
                id: itemDoc.id,
                nomeCurto: itemDoc.data().nome_curto,
                subtotal: itemDoc.data().subtotal,
                quantidade: itemDoc.data().quantidade,
                precoVenda: itemDoc.data().preco_venda,
              }))
  
              // Apenas adiciona o pedido se houver itens com situacao 'reservado'
              if (dadosItensPedios.length > 0) {
                return { ...dadosPedido, itensPedido: dadosItensPedios }
              }
              return null // Ignora pedidos sem itens reservados
            }
          })
        )

        // Filtra qualquer entrada nula (onde não havia itens 'reservado')
        setDadosPedido(dadosPedidos.filter(pedido => pedido !== null))
      } catch (erro) {
        console.error('Erro ao obter documento: ', erro)
      }
    }

    obterPedido()
  }, [])

  return(
    <SafeAreaView>
      {/* Linha tabela */}
      <FlatList
        data={dadosPedido}
        renderItem={({ item }) => (
          <View style={estilos.conteinerPedido}>
            {item.itensPedido.map((produto) => (
              <TouchableOpacity 
                style={estilos.conteinerConteudo} // Novo estilo geral do card
                onPress={() => eliminarFirestore('Pedidos', item.id)}
                key={produto.id}
              >
                <Image
                  style={estilos.imagemProduto}
                  source={require('./img/salada.png')}
                />
                <View style={estilos.infoConteiner}>
                  {/* Nome do produto */}
                  <Text style={estilos.nomeProduto}>{produto.nomeCurto}</Text>

                  {/* Data e hora */}
                  <Text style={estilos.detalhes}>
                    Entrega: {item.dataEntrega} às {item.horaEntrega}
                  </Text>

                  {/* Quantidade e preço */}
                  <Text style={estilos.detalhes}>Quantidade: {produto.quantidade}</Text>
                  <Text style={estilos.detalhes}>Total: R$ {produto.subtotal}</Text>
                </View>
              </TouchableOpacity>
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
    borderRadius: 10, // Bordas arredondadas para a imagem
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
})
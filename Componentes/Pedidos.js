import { collection, getDocs, query, where } from "firebase/firestore"
import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native"
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
      <View style={estilos.linha}>
        <Text style={estilos.linhaTexto}>Produto</Text>
        <Text style={estilos.linhaTexto}>Data</Text>
        <Text style={estilos.linhaTexto}>Hora</Text>
        <Text style={estilos.linhaTexto}>Quantidade</Text>
        <Text style={estilos.linhaTexto}>Valor</Text>
        <Text style={estilos.linhaTexto}>Subtotal</Text>
      </View>
      
      {/* Linha tabela */}
      <FlatList
        data={dadosPedido}
        renderItem={({ item }) => (
          <View>
            {item.itensPedido.map((produto) => (
              <TouchableOpacity 
                style={estilos.linha}
                onPress={() => eliminarFirestore('Pedidos', item.id)}
                key={produto.id}
              >
                <Text style={estilos.linhaTexto}>{produto.nomeCurto}</Text>
                <Text style={estilos.linhaTexto}>{item.dataEntrega}</Text>
                <Text style={estilos.linhaTexto}>{item.horaEntrega}</Text>
                <Text style={estilos.linhaTexto}>{produto.quantidade}</Text>
                <Text style={estilos.linhaTexto}>{produto.precoVenda}</Text>
                <Text style={estilos.linhaTexto}>{produto.subtotal}</Text>
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
  linha:{
    flexDirection: 'row',
  },

  linhaTexto:{
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})
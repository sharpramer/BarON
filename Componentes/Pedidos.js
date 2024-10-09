import { collection, getDocs } from "firebase/firestore"
import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, FlatList } from "react-native"
import { bd } from "../firebase"

export default function Pedidos() {
  const [dadosPedidos, setDadosPedidos] = useState(null)

  useEffect(() => {
    // Função para buscar os dados
    const obterPedido = async () => {
      try {
        const docRef = await getDocs(collection(bd, 'pedidos'))

        const dadosPedidos = docRef.docs.map(doc => ({
          id: doc.id,
          produto: doc.data().produto,
          quantidade: doc.data().quantidade,
          subtotal: doc.data().subtotal,
          dataEntrega: doc.data().data_entrega,
          dataPedido: doc.data().data_pedido,
          horaEntrega: doc.data().hora_entrega,
          horaPedido: doc.data().hora_pedido,
        }))
        setDadosPedidos(dadosPedidos)
      } catch (erro) {
        console.error('Erro ao obter documento: ', erro)
      }
    }

    // Chamar a função
    obterPedido()
  },[])

  return(
    <View>
      <View style={estilos.linha}>
        <Text style={estilos.linhaTexto}>Pedido</Text>
        <Text style={estilos.linhaTexto}>Data</Text>
        <Text style={estilos.linhaTexto}>Hora</Text>
        <Text style={estilos.linhaTexto}>Estado</Text>
        <Text style={estilos.linhaTexto}>Valor</Text>
      </View>
      
      {/* TO DO: O conteúdo do flatlist não aparece */}
      <FlatList
        data={dadosPedidos}
        renderItem={({ item }) => (
          <View style={estilos.linha}>
            <Text style={estilos.linhaTexto}>{item.produto}</Text>
            <Text style={estilos.linhaTexto}>{item.quantidade}</Text>
            <Text style={estilos.linhaTexto}>{item.subtotal}</Text>
            <Text style={estilos.linhaTexto}>{item.dataEntrega}</Text>
            <Text style={estilos.linhaTexto}>{item.dataPedido}</Text>
            <Text style={estilos.linhaTexto}>{item.horaEntrega}</Text>
            <Text style={estilos.linhaTexto}>{item.horaPedido}</Text>
          </View>
        )}
        keyExtractor={(item) => {item.id}}
      />
    </View>
  )
}

const estilos = StyleSheet.create({
  linha:{
    flexDirection: 'row',
  },

  linhaTexto:{
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5
  }
})
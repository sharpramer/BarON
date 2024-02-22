import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from "react-native";

function Tabela({ dados }){
  const renderizarItem = ({ item }) => (
    <View style={estilos.linha}>
      <Text style={estilos.linhaTexto}>{item.pedido}</Text>
      <Text style={estilos.linhaTexto}>{item.data}</Text>
      <Text style={estilos.linhaTexto}>{item.hora}</Text>
      <Text style={estilos.linhaTexto}>{item.estado}</Text>
      <Text style={estilos.linhaTexto}>{item.valor}</Text>
    </View>
  )
  return(
    <View>
      <View style={estilos.linha}>
        <Text style={estilos.linhaTexto}>Pedido</Text>
        <Text style={estilos.linhaTexto}>Data</Text>
        <Text style={estilos.linhaTexto}>Hora</Text>
        <Text style={estilos.linhaTexto}>Estado</Text>
        <Text style={estilos.linhaTexto}>Valor</Text>
      </View>
      <FlatList
        data={dados}
        renderItem={renderizarItem}
        keyExtractor={item => item.id.toString()}
      />
    </View> 
  )
}

function CriarItem(){ 
  const dados =[
    { id: 1, pedido: 'Sandes', data: '5/1/24', hora: '12:00', estado: 'Pronto para recolha', valor: '1.00€'}
  ]

  return(
    <View>
      <Tabela dados={dados}/>
    </View>
  )
}

export default function PaginaInicio() {  
  return (
    <CriarItem/>
  );
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

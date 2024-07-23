import React, { useState } from "react"
import { View, Text, Image, TextInput } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { estilos } from "../../estilos";
import { TouchableHighlight } from "react-native-gesture-handler"

export default function PaginaSaldo() {
  const [valor, setValor] = useState('')

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* Conteiner cabeçalho */}
      <View style={estilos.cabecalho}>
        <Image
          source={require('../../img/utilizador.png')}
        />
        <View>
        <Text style={estilos.txtCabecalhoTitulo}>Utilizador</Text>
        <Text style={estilos.txtCabecalhoSubtitulo}>Saldo</Text>
        </View>
      </View>

      <View style={estilos.conteiner}>
          <TextInput
            style={estilos.cx}
            onChangeText={texto => {setEmail(texto)}}
            placeholder="Email"
            placeholderTextColor={"black"}
            value={valor}
            />
          <View style={estilos.separadorCx}></View>
          <TextInput
            style={estilos.cx}
            onChangeText={texto => {setValor(texto)}}
            placeholder="Valor"
            placeholderTextColor={"black"}
            value={valor}
          />
          <View style={estilos.separadorCx}></View>

          <TouchableHighlight
            style={estilos.btn}
            onPress={() => {alert('Saldo guardado com sucesso!')}}
          >
            <Text style={estilos.txtBtn}>Guardar</Text>
          </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}

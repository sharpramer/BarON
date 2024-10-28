import React, {useEffect, useState} from "react"
import { Modal, View, Text, TouchableHighlight, Image, TextInput, Alert } from "react-native"
import { estilos } from "./estilos"
import { addDoc, collection, updateDoc } from "firebase/firestore"
import { bd } from "../firebase"

export default function FazerPedido(props){
    const [quantidadePedido, setQuantidadePedido] = useState(1)
    const [dataEntrega, setDataEntrega] = useState('')
    const [horaEntrega, setHoraEntrega] = useState('')

    let subtotal
    
    const dataSistema = new Date()
    const dataPedido = `${dataSistema.getDate()}/${dataSistema.getMonth() + 1}/${dataSistema.getFullYear()}`
    const horaPedido = `${dataSistema.getHours()}:${dataSistema.getMinutes()}`

    function converterPrecoParaFloat(preco) {
        // Substitui a vírgula por ponto
        const precoFormatado = preco.replace(',', '.')
        return parseFloat(precoFormatado)
    }
    
    function formatarFloat(numero) {
        return numero.toFixed(2).replace('.', ',')
    }

    const guardarPedido = async (situacao) => {
        try {
            // Adicionar o pedido na coleção 'pedidos' no firestore
            const pedidoRef = await addDoc(collection(bd, 'pedidos'), {
                data_entrega: dataEntrega,
                data_pedido: dataPedido,
                hora_entrega: horaEntrega,
                hora_pedido: horaPedido,
            })
            
            // Adicionar a subcoleção 'itens_pedidos' dentro da coleção 'pedidos' no firestore
            const itensPedidoRef = await addDoc(collection(pedidoRef, 'itens_pedido'), {
                nome_curto: props.produtoSelecionado.nome,
                subtotal: subtotal,
                quantidade: quantidadePedido,
                preco_venda: props.produtoSelecionado.precoVenda,
                descricao: props.produtoSelecionado.descricao,
                situacao: situacao,
            })

            // Atualizar subcoleção itens_pedidos com o código do pedido
            updateDoc(itensPedidoRef, {
                cod_pedido: pedidoRef.id
            })

            if (situacao === 'reservado')
                alert('Pedido reservado com sucesso!')
            else if (situacao === 'carrinho')
                alert('Pedido guardado no carrinho com sucesso!')
        }
        catch (erro) {
            alert('Erro ao registar')
            console.log(`Erro ao registar: ${erro}`)
        }
    }
    
    return(
        <Modal
            visible={props.modalVisibilidade}
            onRequestClose={() => props.setModalVisibilidade(false)}
        >
            <View style={estilos.conteudoModalConteiner}>
                <TouchableHighlight // Botão fechar modal
                    onPress={() => props.setModalVisibilidade(false)}
                    style={estilos.btnFecharModal}
                >
                    <Text style={estilos.txtBtnFecharModal}>X</Text>
                </TouchableHighlight>
                    { props.produtoSelecionado && (
                    <View>
                        <Image
                            source={props.produtoSelecionado.imagem}
                        />

                        {/* Texto subtotal pedido */}
                        <Text style={{alignSelf: "center"}}>{
                            subtotal = formatarFloat(converterPrecoParaFloat(props.produtoSelecionado.precoVenda) * quantidadePedido)
                        }€
                        </Text>                            
                        <Text>Preço com IVA incluído</Text>
                        
                        {/* Quantidade pedido */}
                        <Text>Quantidade</Text>
                        <View>
                            {/* Botão diminuir quantidade pedido */}
                            <TouchableHighlight
                                style={{backgroundColor: "black"}}
                                onPress={() => {
                                    if (quantidadePedido > 1) {
                                        setQuantidadePedido(prevQuantidade => prevQuantidade = prevQuantidade - 1)
                                        console.log(quantidadePedido)
                                    }
                                }}
                            >
                                <Text style={{color: "white", alignSelf:"center"}}>-</Text>
                            </TouchableHighlight>

                            {/* Texto quantidade pedido */}
                            <Text style={{color: "black", alignSelf:"center"}}>{quantidadePedido}</Text>
 
                            {/* Botão aumentar quantidade pedido */}
                            <TouchableHighlight 
                                style={{backgroundColor: "black"}}
                                onPress={() => {
                                    setQuantidadePedido(prevQuantidade => prevQuantidade = prevQuantidade + 1)
                                    console.log(quantidadePedido)
                                }}
                            >
                                <Text style={{color:"white", alignSelf:"center"}}>+</Text>
                            </TouchableHighlight>
                        </View>

                        {/* Conteiner entrega */}
                        <View>

                            {/* Caixa de texto data de entrega */}
                            <TextInput
                                style={{marginVertical: 15, borderColor: 'black', borderWidth: 2, textAlign: 'center'}}
                                placeholder="Data entrega"
                                placeholderTextColor={"black"}
                                onChangeText={(txtDataEntrega) => {setDataEntrega(txtDataEntrega), console.log(txtDataEntrega)}}
                                value={dataEntrega}
                            />

                            {/* Caixa de texto hora de entrega */}
                            <TextInput
                                style={{marginVertical: 15, borderColor: 'black', borderWidth: 2, textAlign: 'center'}}
                                placeholder="Hora entrega"
                                placeholderTextColor={"black"}
                                onChangeText={(txtHoraEntrega) => {setHoraEntrega(txtHoraEntrega), console.log(txtHoraEntrega)}}
                                value={horaEntrega}
                            />
                        </View>

                        {/* Conteiner para adicionar o pedido ao carrinho ou para reservar o pedido */}
                        <View>
                            <TouchableHighlight // Botão adicionar pedido ao carrinho
                                onPress={() => {
                                    if (dataPedido === '' || dataEntrega === '' || dataPedido === '' || horaPedido === '') {
                                        alert('Favor prencher todos os campos')
                                    } else {
                                        guardarPedido('carrinho')
                                    }
                                }}
                            >
                                <Text>Carrinho</Text>
                            </TouchableHighlight>

                            <TouchableHighlight // Botão reservar pedido
                                onPress={() => {
                                    if (dataPedido === '' || dataEntrega === '' || dataPedido === '' || horaPedido === '') {
                                        alert('Favor prencher todos os campos')
                                    } else {
                                        guardarPedido('reservado')
                                    }
                                }}
                            >
                                <Text>Reservar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                )}
            </View>
        </Modal>
    )
}
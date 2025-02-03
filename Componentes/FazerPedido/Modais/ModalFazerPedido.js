import { useState } from "react"
import { StyleSheet, Modal, View, TouchableHighlight,TextInput, Text, Image, Alert, } from "react-native"
import { estilosFazerPedido } from "../FazerPedido"
import { estilos } from "../../estilos"
import { auth, bd } from "../../../firebase"
import { buscarValorFirestore } from "../../Global"
import { addDoc, collection, updateDoc } from "firebase/firestore"

export default function ModalFazerPedido(props) {
    const [ modalMetodoPagamento, setModalMetodoPagamento ] = useState(false) 
    const [ metodoPagamento, setMetodoPagamento ] = useState('Dinheiro') 
    const [ localEntrega, setLocalEntrega ] = useState('')
    const [ caixaTextoLocalEntregaVisibilidade, setCaixaTextoLocalEntregaVisibilidade ] = useState(false)
    const [ quantidadePedido, setQuantidadePedido ] = useState(1)
    const [ observacoes, setObservacoes ] = useState('')
    const [ troco, setTroco ] = useState('Não é necessário troco')
    
    let subtotal

    function definirCaixaTextoLocalEntregaVisibilidade() {
        Alert.alert(
            "Local entrega",
            "Gostaria da entrega na loja do Divino Fogão?",
            [
                { 
                    text: "Sim", 
                    onPress: () => {setCaixaTextoLocalEntregaVisibilidade(false), console.log("Local de entrega Divino Fogão")} 
                },
                
                {
                    text: "Não", 
                    onPress: () => {setCaixaTextoLocalEntregaVisibilidade(true), console.log("Outro local de entrega")} 
                },
            ]
        )
    }

    function definirTroco() {
        Alert.alert(
            "Troco",
            "Precisa de troco?",
            [
                { 
                    text: "Sim", 
                    onPress: () => {
                        setTroco('É necessário troco')
                        console.log('É necessário troco')
                    } 
                },
                
                {
                    text: "Não", 
                    onPress: () => {
                        setTroco('Não é necessário troco')
                        console.log('Não é necessário troco')
                    } 
                }
            ]
        )
    }

    const guardarPedido = async (situacao) => {
        try {
            
            const utilizadorAtual = auth.currentUser
            
            if (!utilizadorAtual) {
                console.error("Utilizador não autenticado.")
            }

            // Buscar código do utilizador
            const codigoUtilizador = await buscarValorFirestore('Utilizadores', 'codigo', utilizadorAtual.uid)
            console.log("Valor do Firestore:", codigoUtilizador.codigo)

            // Adicionar o pedido na coleção 'pedidos' no firestore
            const pedidoRef = await addDoc(collection(bd, 'Pedidos'), {
                data_entrega: props.dataEntrega,
                data_pedido: props.dataPedido,
                hora_entrega: props.horaEntrega,
                hora_pedido: props.horaPedido,
            })
            
            updateDoc(pedidoRef, {
                cod_pedido: pedidoRef.id
            })

            if (troco === 'É necessário troco' && metodoPagamento === 'Dinheiro') {
                // Adicionar a subcoleção 'itens_pedidos' dentro da coleção 'pedidos' no firestore
                let itensPedidoRef = await addDoc(collection(pedidoRef, 'itens_pedido'), {
                    nome_curto: props.produtoSelecionado.produto,
                    codigo_utilizador: codigoUtilizador.codigo, 
                    subtotal: subtotal,
                    quantidade: quantidadePedido,
                    preco_venda: props.produtoSelecionado.precoVenda,
                    descricao: props.produtoSelecionado.descricao,
                    situacao: situacao,
                    observacoes: observacoes,
                    metodoPagamento: metodoPagamento,
                    localEntrega: localEntrega,
                    troco: troco,
                })

                // Atualizar subcoleção itens_pedidos com o código do pedido
                updateDoc(itensPedidoRef, {
                    cod_pedido: pedidoRef.id,
                })
            } else {

                // Adicionar a subcoleção 'itens_pedidos' dentro da coleção 'pedidos' no firestore
                let itensPedidoRef = await addDoc(collection(pedidoRef, 'itens_pedido'), {
                    codigo_utilizador: codigoUtilizador.codigo,
                    nome_curto: props.produtoSelecionado.produto,
                    subtotal: subtotal,
                    quantidade: quantidadePedido,
                    preco_venda: props.produtoSelecionado.precoVenda,
                    descricao: props.produtoSelecionado.descricao,
                    situacao: situacao,
                    observacoes: observacoes,
                    metodoPagamento: metodoPagamento,
                    localEntrega: localEntrega,
                })
                
                // Atualizar subcoleção itens_pedidos com o código do pedido
                updateDoc(itensPedidoRef, {
                    cod_pedido: pedidoRef.id,
                })
            }


            if (situacao === 'reservado')
                alert('Pedido reservado com sucesso!')
            else if (situacao === 'carrinho')
                alert('Pedido guardado no carrinho com sucesso!')
        }
        catch (erro) {
            alert('Erro ao guardar pedido')
            console.error(`Erro ao guardar pedido: ${erro}`)
        }
    }

    return(
        <View>
            <Modal
                visible={props.modalVisibilidade}
                onRequestClose={() => props.setModalVisibilidade(false)}
            >
                <View>
                    {/* Botão fechar modal */}
                    <TouchableHighlight 
                        onPress={() => props.setModalVisibilidade(false)}
                        style={estilos.btnFecharModal}
                    >
                        <Text style={estilos.txtBtnFecharModal}>X</Text>
                    </TouchableHighlight>
                        { props.produtoSelecionado && (
                        <View>
                            <Image
                                style={estilosFazerPedido.imagemProduto}
                                source={props.produtoSelecionado.imagem}
                            />

                            {/* Texto subtotal pedido */}
                            <Text style={{alignSelf: "center"}}>R$ {
                                subtotal = props.formatarFloat(
                                    props.converterPrecoParaFloat(props.produtoSelecionado.precoVenda) * quantidadePedido
                                )
                            }
                            </Text>                            
                            
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
                                {/* Botão data de entrega */}
                                <TouchableHighlight
                                    style={estilos.btn}
                                    onPress={() => props.setModalDataVisibilidade(true)}
                                >
                                    <Text>Data entrega</Text>
                                </TouchableHighlight>

                                {/* Botão hora de entrega */}
                                <TouchableHighlight
                                    style={estilos.btn}
                                    onPress={() => props.setModalHoraVisibilidade(true)}
                                >
                                    <Text>Hora entrega</Text>
                                </TouchableHighlight>

                                {/* Texto observações pedido */}
                                <Text style={estilosModalFazerPedido.txtObservacoes}>Observações</Text>
                                
                                {/* Caixa de texto observações do pedido */}
                                <TextInput
                                    style={estilosModalFazerPedido.cx}
                                    placeholder="Caso queira mudar algo no pedido, informe aqui"
                                    onChangeText={textoObservacoes => {
                                        setObservacoes(textoObservacoes)
                                        console.log(observacoes)
                                    }}
                                />
                            </View>

                            {/* Botão modal método de pagamento */}
                            <TouchableHighlight
                                onPress={() => {setModalMetodoPagamento(true)}}
                            >
                                <Text>Método de pagamento: {metodoPagamento}</Text>
                            </TouchableHighlight>

                            {/* Conteiner para adicionar o pedido ao carrinho ou para reservar o pedido */}
                            <View>
                                <TouchableHighlight // Botão adicionar pedido ao carrinho
                                    style={{marginVertical: 10}}
                                    onPress={() => {
                                        guardarPedido('carrinho')
                                    }}
                                >
                                    <Text>Carrinho</Text>
                                </TouchableHighlight>

                                <TouchableHighlight // Botão reservar pedido
                                    onPress={() => {
                                        guardarPedido('reservado')
                                    }}
                                >
                                    <Text>Reservar</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    )}
                </View>
            </Modal>
            
            {/* Modal método de pagamento */}
            <Modal
                visible={modalMetodoPagamento}
                onRequestClose={() => setModalMetodoPagamento(false)}               
            >
                <TouchableHighlight 
                        onPress={() => setModalMetodoPagamento(false)}
                        style={estilos.btnFecharModal}
                >
                    <Text style={estilos.txtBtnFecharModal}>X</Text>
               </TouchableHighlight>

                {/* Botão método pagamento cartão */}
                <TouchableHighlight
                    onPress={() => {
                        setMetodoPagamento('Cartão')
                        definirCaixaTextoLocalEntregaVisibilidade()
                    }}
                >
                    <Text>Cartão</Text>
                </TouchableHighlight>

                {/* Botão método pagamento dinheiro */}
                <TouchableHighlight
                    onPress={() => {
                        setMetodoPagamento('Dinheiro')
                        definirTroco()
                        definirCaixaTextoLocalEntregaVisibilidade()
                    }}
                >
                    <Text>Dinheiro</Text>
                </TouchableHighlight>
                
            </Modal>

            {/* Modal Caixa texto local entrega */}
            <Modal
                visible={caixaTextoLocalEntregaVisibilidade}
                onRequestClose={() => {setCaixaTextoLocalEntregaVisibilidade(false)}}
            >
                <TextInput
                    style={estilosModalFazerPedido.cx}
                    onChangeText={textoLocalEntrega => {
                        setLocalEntrega(textoLocalEntrega)
                        setModalMetodoPagamento(false)
                        console.log(textoLocalEntrega)
                    }}
                    value={localEntrega}
                    placeholder="Digite aqui o local da entrega"
                />

                <TouchableHighlight
                    onPress={() => { setCaixaTextoLocalEntregaVisibilidade(false) }}
                >
                    <Text>Fechar</Text>
                </TouchableHighlight>
            </Modal>
        </View>
    )
}

export const estilosModalFazerPedido = StyleSheet.create({
    txtObservacoes: {
        marginVertical: 5
    },

    cx: {
        marginVertical: 5,
        borderColor: 'black',
        borderWidth: 2,
    },

})
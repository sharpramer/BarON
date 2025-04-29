import { useEffect, useState } from "react"
import { StyleSheet, Modal, View, TouchableHighlight,TextInput, Text, Image, Alert, } from "react-native"
import { estilosFazerPedido } from "../FazerPedido"
import { estilos } from "../../estilos"
import { auth, bd } from "../../../firebase"
import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore"

export default function ModalFazerPedido(props) {
    const [ modalMetodoPagamento, setModalMetodoPagamento ] = useState(false) 
    const [ metodoPagamento, setMetodoPagamento ] = useState('Dinheiro') 
    const [ quantidadePedido, setQuantidadePedido ] = useState(1)
    const [ observacoes, setObservacoes ] = useState('')
    const [ troco, setTroco ] = useState('Não é necessário troco')
    
    useEffect(() => {
        if (props.produtoSelecionado) {
          if (!props.produtoSelecionado.precoDescontado) {
            const precoOriginal = parseFloat(props.produtoSelecionado.precoVenda.replace(',', '.'))
            props.produtoSelecionado.precoDescontado = precoOriginal * 0.8
          }
        }
      }, [props.produtoSelecionado])
      
    let subtotal
    
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

    const buscarNomeUtilizador = async () => {
        try {
            const utilizadorAtual = auth.currentUser
            if (!utilizadorAtual) {
              console.log("Nenhum utilizador autenticado.")
              return
            }
        
            const linha = query(
                collection(
                    bd, 
                    "Utilizadores"
                ), 
                where(
                    "codigo",
                    "==",
                    utilizadorAtual.uid
                )
            )
        
            const linhaSnapshot = await getDocs(linha)
            
            if (!linhaSnapshot.empty) {
                const documentoEncontrado = linhaSnapshot.docs[0]
                const nomeUtilizadorBuscado = documentoEncontrado.data().nome
                console.log(`Nome utilizador buscado: ${nomeUtilizadorBuscado}`)
                
                return nomeUtilizadorBuscado 
            } else {
              console.log("Nenhum utilizador encontrado.")
              return null
            }

        } catch (erro) {
            console.error("Erro ao buscar utilizador:", erro)
            return null
        }
    }

    const guardarPedido = async (situacao) => {
        try {
            const utilizadorAtual = auth.currentUser
            
            if (!utilizadorAtual) 
                console.error("Usuário não autenticado.")

            else if (utilizadorAtual && props.dataEntrega != ''){
                
                console.log("Usuário autenticado:", auth.currentUser?.uid)

                console.log(`Imagem: ${props.produtoSelecionado.imagemCaminho}`);
                

                const nomeUtilizador = await buscarNomeUtilizador()
                
                console.log(nomeUtilizador)
                

                // Adicionar o pedido na coleção 'pedidos' no firestore
                const pedidoRef = await addDoc(collection(bd, 'Pedidos'), {
                    codigo_utilizador: utilizadorAtual.uid, 
                    nome_utilizador: nomeUtilizador,
                    data_entrega: props.dataEntrega,
                    data_pedido: props.dataPedido,
                    hora_entrega: props.horaEntrega,
                    hora_pedido: props.horaPedido,
                })
                
                updateDoc(pedidoRef, {
                    cod_pedido: pedidoRef.id
                })

                // Adicionar a subcoleção 'itens_pedidos' dentro da coleção 'pedidos' no firestore
                let itensPedidoRef = await addDoc(collection(pedidoRef, 'itens_pedido'), {
                    nome_curto: props.produtoSelecionado.produto,
                    codigo_utilizador: utilizadorAtual.uid, 
                    subtotal: subtotal,
                    quantidade: quantidadePedido,
                    preco_venda: props.produtoSelecionado.precoVenda,
                    descricao: props.produtoSelecionado.descricao,
                    situacao: situacao,
                    observacoes: observacoes,
                    metodoPagamento: metodoPagamento,
                    troco: troco,
                    imagem: props.produtoSelecionado.imagemCaminho
                })

                // Atualizar subcoleção itens_pedidos com o código do pedido
                updateDoc(itensPedidoRef, {
                    cod_pedido: pedidoRef.id,
                })
                
                situacao === 'reservado' ? alert(
                    'Pedido reservado com sucesso!'
                ) : alert(
                    'Pedido guardado no carrinho com sucesso!'
                )
            } else if (props.dataEntrega === '') {
                Alert.alert('Aviso', 'Por favor insira a data de entrega!')
            }
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
                        style={estilos.btnFechar}
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
                            <Text style={{alignSelf: "center", marginBottom: 15}}>R$ {
                                subtotal = (parseFloat(props.produtoSelecionado.precoDescontado.replace(',', '.')) * quantidadePedido).toFixed(2).replace('.', ',')
                            }
                            </Text>                            
                            
                            {/* Conteiner quantidade */}
                            <View style={estilosModalFazerPedido.conteinerQuantidade}>
                                {/* Texto quantidade */}
                                <Text style={{ marginRight: 10, fontSize: 16 }}>Quantidade: </Text>

                                {/* Botão diminuir quantidade pedido */}
                                <TouchableHighlight
                                    style={[estilosModalFazerPedido.btnQuantidade, { marginRight: 10 }]}
                                    onPress={() => {
                                        if (quantidadePedido > 1) {
                                            setQuantidadePedido(prevQuantidade => prevQuantidade - 1);
                                        }
                                    }}
                                >
                                    <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>-</Text>
                                </TouchableHighlight>

                                {/* Texto quantidade pedido */}
                                <Text style={{ marginHorizontal: 10, fontSize: 18 }}>
                                    {quantidadePedido}
                                </Text>

                                {/* Botão aumentar quantidade pedido */}
                                <TouchableHighlight
                                    style={[estilosModalFazerPedido.btnQuantidade, { marginLeft: 10 }]}
                                    onPress={() => {
                                        setQuantidadePedido(prevQuantidade => prevQuantidade + 1);
                                    }}
                                >
                                    <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>+</Text>
                                </TouchableHighlight>
                            </View>


                            {/* Conteiner entrega */}
                            <View>
                                <View style={{flexDirection: 'row', marginHorizontal: 5, marginBottom: 15}}> 
                                    {/* Botão data de entrega */}
                                    <TouchableHighlight
                                        style={[estilos.btn, {marginHorizontal: 7}]}
                                        onPress={() => props.setModalDataVisibilidade(true)}
                                    >
                                        <Text>Data entrega</Text>
                                    </TouchableHighlight>

                                    {/* Botão hora de entrega */}
                                    <TouchableHighlight
                                        style={[estilos.btn, {marginHorizontal: 7}]}
                                        onPress={() => props.setModalHoraVisibilidade(true)}
                                        >
                                        <Text>Hora entrega</Text>
                                    </TouchableHighlight>
                                </View>

                                {/* Texto observações pedido */}
                                <Text style={estilosModalFazerPedido.txtObservacoes}>Observações</Text>

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
                                <Text style={{marginVertical: 10}}>Método de pagamento: {metodoPagamento}</Text>
                            </TouchableHighlight>

                            {/* Conteiner para adicionar o pedido ao carrinho ou para reservar o pedido */}
                            <View>
                                {/* Botão reservar pedido */}
                                <TouchableHighlight 
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
                {/* Botão fechar modal método pagamento */}
                <TouchableHighlight 
                    onPress={() => setModalMetodoPagamento(false)}
                    style={estilos.btnFechar}
                >
                    <Text style={estilos.txtBtnFecharModal}>X</Text>
               </TouchableHighlight>

                {/* Botão método pagamento cartão */}
                <TouchableHighlight
                    onPress={() => {
                        setMetodoPagamento('Cartão')
                        setModalMetodoPagamento(false)
                    }}
                >
                    <Text>Cartão</Text>
                </TouchableHighlight>

                {/* Botão método pagamento dinheiro */}
                <TouchableHighlight
                    onPress={() => {
                        setMetodoPagamento('Dinheiro')
                        setModalMetodoPagamento(false)
                        definirTroco()
                    }}
                >
                    <Text>Dinheiro</Text>
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

    conteinerQuantidade: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    conteudoConteinerQuantidade: {
        marginRight: 7, // Deixa sem margem aqui
    },    

    btnQuantidade:{
        justifyContent:"center",
        backgroundColor: "black",
        borderRadius: 90,
        width: 25,
        height: 27
    }
})
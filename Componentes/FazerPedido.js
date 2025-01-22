import React, {useState} from "react"
import { Modal, View, Text, TouchableHighlight, Image, StyleSheet } from "react-native"
import { Calendar } from "react-native-calendars";
import { bd, auth } from "../firebase"
import { addDoc, collection, updateDoc } from "firebase/firestore"
import { buscarValorFirestore } from "./Global";
import { estilos } from "./estilos"

export default function FazerPedido(props){
    const [quantidadePedido, setQuantidadePedido] = useState(1)
    const [dataEntrega, setDataEntrega] = useState('')
    const [modalDataVisibilidade, setModalDataVisibilidade] = useState(false)
    const [modalHoraVisibilidade, setModalHoraVisibilidade] = useState(false)
    const [minutos, setMinutos] = useState(0)
    const [hora, setHora] = useState(12)
    
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

    // Função aumentar minutos
    function aumentarMinutos() {
        if (minutos >= 0 && minutos < 59){
            setMinutos((minutoAnterior) => minutoAnterior + 1)
            console.log(minutos)
        }
    }

    // Função diminuir minutos
    function diminuirMinutos() {
        if (minutos > 0 && minutos <= 59){
            setMinutos((minutoAnterior) => minutoAnterior - 1)
            console.log(minutos)
        }
    }

    // Função aumentar hora
    function aumentarHora() {
        if (hora >= 12 && hora < 15){
            setHora((horaAnterior) => horaAnterior + 1)
            console.log(hora)
        }
    }

    // Função diminuir hora
    function diminuirHora() {
        if (hora > 12 && hora <= 15){
            setHora((horaAnterior) => horaAnterior - 1)
            console.log(hora)
        }
    }
    
    const guardarPedido = async (situacao) => {
        try {
            const horaEntrega = `${hora}:${minutos}`
            
            // Buscar código do utilizador
            const utilizadorAtual = auth.currentUser;
        
            if (!utilizadorAtual) {
            console.error("Utilizador não autenticado.");
            }
        
            const codigoUtilizador = await buscarValorFirestore('Utilizadores', 'codigo', utilizadorAtual.uid);
            console.log("Valor do Firestore:", codigoUtilizador.codigo);

            // Adicionar o pedido na coleção 'pedidos' no firestore
            const pedidoRef = await addDoc(collection(bd, 'Pedidos'), {
                data_entrega: dataEntrega,
                data_pedido: dataPedido,
                hora_entrega: horaEntrega,
                hora_pedido: horaPedido,
            })
            
            updateDoc(pedidoRef, {
                cod_pedido: pedidoRef.id
            })

            // Adicionar a subcoleção 'itens_pedidos' dentro da coleção 'pedidos' no firestore
            const itensPedidoRef = await addDoc(collection(pedidoRef, 'itens_pedido'), {
                nome_curto: props.produtoSelecionado.produto,
                codigo_utilizador: codigoUtilizador.codigo, 
                subtotal: subtotal,
                quantidade: quantidadePedido,
                preco_venda: props.produtoSelecionado.precoVenda,
                descricao: props.produtoSelecionado.descricao,
                situacao: situacao,
            })

            // Atualizar subcoleção itens_pedidos com o código do pedido
            updateDoc(itensPedidoRef, {
                cod_pedido: pedidoRef.id,
            })

            if (situacao === 'reservado')
                alert('Pedido reservado com sucesso!')
            else if (situacao === 'carrinho')
                alert('Pedido guardado no carrinho com sucesso!')
        }
        catch (erro) {
            alert('Erro ao guardar pedido')
            console.log(`Erro ao guardar pedido: ${erro}`)
        }
    }
    
    return(
        <View>
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
                                style={estilosFazerPedido.imagemProduto}
                                source={props.produtoSelecionado.imagem}
                            />

                            {/* Texto subtotal pedido */}
                            <Text style={{alignSelf: "center"}}>R$ {
                                subtotal = formatarFloat(converterPrecoParaFloat(props.produtoSelecionado.precoVenda) * quantidadePedido)
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
                                    onPress={() => setModalDataVisibilidade(true)}
                                >
                                    <Text>Data entrega</Text>
                                </TouchableHighlight>

                                {/* Botão hora de entrega */}
                                <TouchableHighlight
                                    style={estilos.btn}
                                    onPress={() => setModalHoraVisibilidade(true)}
                                >
                                    <Text>Hora entrega</Text>
                                </TouchableHighlight>

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

            {/* Modal data entrega */}
            <Modal
                style={{height: 80, overflow: 40}}
                visible={modalDataVisibilidade}
                onRequestClose={() => setModalDataVisibilidade(true)}
            >
                <TouchableHighlight // Botão fechar modal
                    onPress={() => setModalDataVisibilidade(false)}
                    style={estilos.btnFecharModal}
                >
                    <Text style={estilos.txtBtnFecharModal}>X</Text>
                </TouchableHighlight>
                
                {/* Calendário mudar data entrega*/}
                <Calendar
                    minDate={new Date().toDateString()}
                    onDayPress={data => {
                        let dataEntrega = `${data.day}/${data.month}/${data.year}`
                        console.log(dataEntrega)
                        setDataEntrega(dataEntrega)
                    }}
                    theme={{
                        selectedDayBackgroundColor: "#0DE2E9",
                        selectedDayTextColor: 'white'
                    }}
                />
            </Modal>

            {/* Modal hora entrega */}
            <Modal
                visible={modalHoraVisibilidade}
                transparent={true}
                onRequestClose={() => setModalHoraVisibilidade(true)}
            >
                {/* Conteiner mudar hora entrega*/}
                <View style={estilosFazerPedido.conteinerModal}>
                    <View style={estilosFazerPedido.conteinerMudarHoraEntrega}>
                        <View style={estilosFazerPedido.conteinerConteudoHoraEntrega}>
                            <View>
                                {/* Botão adicionar hora*/}
                                <TouchableHighlight
                                    onPress={aumentarHora}
                                >
                                    <Text style={estilosFazerPedido.txtBotaoMudarHoraEntrega}>+</Text>
                                </TouchableHighlight>

                                <Text>{hora}</Text>

                                {/* Botão diminuir hora*/}
                                <TouchableHighlight
                                    onPress={diminuirHora}
                                >
                                    <Text style={estilosFazerPedido.txtBotaoMudarHoraEntrega}>-</Text>
                                </TouchableHighlight>
                            </View>
                                
                            <Text style={estilosFazerPedido.txtSeparador}>:</Text>

                            <View>
                                {/* Botão adicionar minutos*/}
                                <TouchableHighlight
                                    onPress={aumentarMinutos}
                                >
                                    <Text style={estilosFazerPedido.txtBotaoMudarHoraEntrega}>+</Text>
                                </TouchableHighlight>

                                <Text>{minutos}</Text>

                                {/* Botão diminuir minutos*/}
                                <TouchableHighlight
                                    onPress={diminuirMinutos}
                                >
                                    <Text style={estilosFazerPedido.txtBotaoMudarHoraEntrega}>-</Text>
                                </TouchableHighlight>
                            </View>
                        </View>

                        {/* Botão fechar modal contador */}
                        <TouchableHighlight
                            style={estilos.btn}
                            onPress={() => setModalHoraVisibilidade(false)}
                        >
                            <Text style={estilos.txtBtn}>Fechar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const estilosFazerPedido = StyleSheet.create({
    conteinerModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },

    conteinerMudarHoraEntrega: {
        width: '90%',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
    },

    conteinerConteudoHoraEntrega:{
        flexDirection: 'row',
    },

    imagemProduto:{
        height: 250,
        width: "auto"
    },

    txtBotaoMudarHoraEntrega: {
        marginTop: 0,
        color: '#0DE2E9',
        fontSize: 40,
    },

    txtSeparador:{
        marginHorizontal: 15,
        alignSelf: 'center',
    },
});
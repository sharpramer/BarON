import React, {useState} from "react"
import { Modal, View, Text, TouchableHighlight, StyleSheet } from "react-native"
import { Calendar } from "react-native-calendars";
import { estilos } from "../estilos"
import ModalFazerPedido from "./Modais/ModalFazerPedido";

export default function FazerPedido(props){
    const [dataEntrega, setDataEntrega] = useState('')
    const [modalDataVisibilidade, setModalDataVisibilidade] = useState(false)
    const [modalHoraVisibilidade, setModalHoraVisibilidade] = useState(false)
    const [minutos, setMinutos] = useState(0)
    const [hora, setHora] = useState(12)

    const dataSistema = new Date()
    const dataPedido = `${dataSistema.getDate()}/${dataSistema.getMonth() + 1}/${dataSistema.getFullYear()}`
    const horaPedido = `${dataSistema.getHours()}:${dataSistema.getMinutes()}`
    
    // Função aumentar minutos
    function aumentarMinutos() {
        setMinutos( prevMinutos => {
            const novoMinuto = (prevMinutos + 1) % 60
            if (novoMinuto === 0) {
                aumentarHora()
            }
            return novoMinuto
        })
    }

    // Função diminuir minutos
    function diminuirMinutos() {
        setMinutos( prevMinutos => {
            const novoMinuto = (prevMinutos - 1 + 60) % 60
            if (novoMinuto === 59) {
                diminuirHora()
            }
            return novoMinuto
        })
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

    const horaEntregaFormatada = `${hora}:${String(minutos).padStart(2, "0")}`
    
    return(
        <View>
            {/* Componente ModalFazerPedido */}
            <ModalFazerPedido
                dataEntrega={dataEntrega}
                dataPedido={dataPedido}
                horaPedido={horaPedido}
                horaEntrega={horaEntregaFormatada}
                modalVisibilidade={props.modalVisibilidade}
                produtoSelecionado={props.produtoSelecionado} 
                setModalDataVisibilidade={setModalDataVisibilidade}
                setModalHoraVisibilidade={setModalHoraVisibilidade}
                setModalVisibilidade={props.setModalVisibilidade}
            />

            {/* Modal data entrega */}
            <Modal
                style={{height: 80, overflow: 40}}
                visible={modalDataVisibilidade}
                onRequestClose={() => setModalDataVisibilidade(true)}
            >
                <TouchableHighlight // Botão fechar modal
                    onPress={() => setModalDataVisibilidade(false)}
                    style={estilos.btnFechar}
                >
                    <Text>X</Text>
                </TouchableHighlight>
                
                {/* Calendário mudar data entrega*/}
                <Calendar
                    minDate={new Date().toDateString()}
                    onDayPress={data => {
                        let dataEntrega = `${data.day}/${data.month}/${data.year}`
                        console.log(dataEntrega)
                        setDataEntrega(dataEntrega)
                        setModalDataVisibilidade(false)
                    }}
                    theme={{
                        selectedDayBackgroundColor: "#0DE2E9",
                        selectedDayTextColor: 'white'
                    }}
                    hideArrows={true}
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

                                <Text>{String(minutos).padStart(2, "0")}</Text>

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

export const estilosFazerPedido = StyleSheet.create({
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
        height: 300,
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

    
})
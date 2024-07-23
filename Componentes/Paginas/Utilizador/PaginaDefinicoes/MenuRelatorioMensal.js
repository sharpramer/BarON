import React, {useState} from "react";
import { View, TouchableHighlight, Modal, Text, StyleSheet, FlatList } from "react-native";
import { estilos } from "../../../estilos"

function TabelaRelatorioMensal({ dados }) {
    const renderizarItem = ({ item }) => (
        <View style={estilosRelatorioMensal.linha}>
            <Text style={estilosRelatorioMensal.linhaTexto}>{item.produto}</Text>
            <Text style={estilosRelatorioMensal.linhaTexto}>{item.preco}€</Text>
            <Text style={estilosRelatorioMensal.linhaTexto}>{item.quantidade}</Text>
            <Text style={estilosRelatorioMensal.linhaTexto}>{item.quantidade * item.preco}€</Text>
        </View>
    )

    return(
        <View>
            <View style={estilosRelatorioMensal.linha}>
                <Text style={estilosRelatorioMensal.linhaTexto}>Produto</Text>
                <Text style={estilosRelatorioMensal.linhaTexto}>Preço</Text>
                <Text style={estilosRelatorioMensal.linhaTexto}>Quantidade</Text>
                <Text style={estilosRelatorioMensal.linhaTexto}>Total</Text>
            </View>

            <FlatList
                data={dados}
                renderItem={renderizarItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

export default function MenuRelatorioMensal() {
  const [modalRelatorioMensalVisibilidade, setModalRelatorioMensalVisibilidade] = useState(false);
  const dadosArray = [
    { id: 1, produto: 'Sumo de laranja', quantidade: 1, preco: 1.2 }
]
    return (
        <View>
            {/* Botão menu relatório mensal */}
            <TouchableHighlight
                onPress={() => {
                    setModalRelatorioMensalVisibilidade(true);
                }}
            >
                <Text>Relatório mensal</Text>
            </TouchableHighlight>

            <Modal
                style={estilos.conteiner}
                visible={modalRelatorioMensalVisibilidade}
                onRequestClose={setModalRelatorioMensalVisibilidade}
            >
                {/* Botão fechar modal menu relatório mensal */}
                <TouchableHighlight
                    style={estilos.btnFecharModal}
                    onPress={() => {
                        setModalRelatorioMensalVisibilidade(false);
                    }}
                >
                    <Text>X</Text>
                </TouchableHighlight>
                
                <TabelaRelatorioMensal dados={dadosArray}/>

            </Modal>
        </View>
    );
}

const estilosRelatorioMensal = StyleSheet.create({
    linha:{
        flexDirection: 'row',
    },
  
    linhaTexto:{
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#000',
      padding: 5,
    }
})
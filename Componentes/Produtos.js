import { React } from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";

export default function Produtos(){
    return(
        <View>
            <TouchableHighlight>
                <Image
                    source={require("./img/suco-laranja.png")}
                />
                <Text>Sumo de laranja</Text>
                <Text>1,00€</Text>
            </TouchableHighlight>
            
            <TouchableHighlight>
                <Image
                    source={require("./img/tosta-mista.png")}
                />
                <Text>Sumo de laranja</Text>
                <Text>1,20€</Text>
            </TouchableHighlight>
            
            <TouchableHighlight>
                <Image
                    source={require("./img/risoles.jpg")}
                />
                <Text>Sumo de laranja</Text>
                <Text>1,60€</Text>
            </TouchableHighlight>
            
            <TouchableHighlight>
                <Image
                    source={require("./img/coxinha.png")}
                />
                <Text>Sumo de laranja</Text>
                <Text>2,00€</Text>
            </TouchableHighlight>
            
        </View>
    )
}
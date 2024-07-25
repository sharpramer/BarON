import { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaginaCarrinho() {
    const [buscar, setBuscar] = useState('')
    
    return(
        <SafeAreaView style={{flex: 1}}>
            <View>
                <TextInput
                    style={{borderColor: 'black', borderWidth: 2, color: 'black', textAlign: 'center'}}
                    onChangeText={(texto) => {setBuscar(texto)}}
                    value={buscar}
                />
                <Image
                    source={require('../../img/buscar.png')}
                />
            </View>
        </SafeAreaView>
    )
}
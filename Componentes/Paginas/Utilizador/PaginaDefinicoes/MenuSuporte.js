import { View, Text, TouchableHighlight } from "react-native";
import { estilosMenus } from "./estilos/estilosMenus";

export function MenuSuporte() {

  return (
    <View>
      {/* Botão menu definições Suporte */}
      <TouchableHighlight
        style={estilosMenus.tituloMenu}
        onPress={() => {
          alert('Caso necessite de algum suporte, contacte-nos pelo email: divinobarrasul@gmail.com')
        }}
      >
        <Text>Suporte</Text>
      </TouchableHighlight>
    </View>
  );
}

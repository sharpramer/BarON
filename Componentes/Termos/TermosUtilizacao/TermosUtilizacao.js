import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermosUtilizacao() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={estilosTermosUtilizacao.scrollContent}>
        <View style={estilosTermosUtilizacao.conteudo}>
          <Text style={estilosTermosUtilizacao.titulo}>Termos de Utilização</Text>

          <Text style={estilosTermosUtilizacao.paragrafo}>Última atualização: 02/04/2025</Text>

          <Text style={estilosTermosUtilizacao.subtitulo}>1. Definições</Text>
          <Text style={estilosTermosUtilizacao.paragrafo}>
            Para os fins deste documento, "A empresa" refere-se à CELEGHINI COMERCIO E ALIMENTACAO LTDA, 
            com o CNPJ 10.333.851/0001-00, com sede na Avenida Diario de Noticias, 300 - Cristal, 
            Porto Alegre - RS, 90.810-080.
          </Text>

          <Text style={estilosTermosUtilizacao.subtitulo}>2. Idade Mínima e Elegibilidade</Text>
          <Text style={estilosTermosUtilizacao.paragrafo}>
            O uso deste aplicativo é 
            <Text style={{ fontWeight: 'bold' }}> estritamente permitido apenas para maiores de 18 anos.</Text>
          </Text>
          <Text style={estilosTermosUtilizacao.paragrafo}>
            Caso seja identificado que um usuário menor de idade criou uma conta, essa conta será suspensa ou excluída imediatamente.
          </Text>

          <Text style={estilosTermosUtilizacao.subtitulo}>3. Cadastro e Segurança da Conta</Text>
          <Text style={estilosTermosUtilizacao.paragrafo}>
            O usuário é responsável por manter a confidencialidade de suas credenciais de acesso e não deve compartilhá-las com terceiros.
          </Text>

          <Text style={estilosTermosUtilizacao.subtitulo}>4. Uso Permitido do Aplicativo</Text>
          <Text style={estilosTermosUtilizacao.paragrafo}>
            É <Text style={{ fontWeight: 'bold' }}>estritamente proibido</Text>:
          </Text>
          <Text style={estilosTermosUtilizacao.paragrafo}>
            - Violar qualquer lei ou regulamento ao utilizar o aplicativo.
          </Text>
          <Text style={estilosTermosUtilizacao.paragrafo}>
            - Utilizar o aplicativo para atividades ilegais ou prejudiciais.
          </Text>
          <Text style={estilosTermosUtilizacao.paragrafo}>
            - Tentar obter acesso não autorizado ao sistema, servidores ou banco de dados.
          </Text>

          <Text style={estilosTermosUtilizacao.subtitulo}>5. Acesso ao Código-Fonte e Modificações</Text>
          <Text style={estilosTermosUtilizacao.paragrafo}>
            O código-fonte deste aplicativo é
            <Text style={{ fontWeight: 'bold' }}> restrito </Text>
            e pode ser acessado ou modificado apenas por pessoas autorizadas pela empresa.
          </Text>

          <Text style={estilosTermosUtilizacao.subtitulo}>6. Responsabilidades e Limitações</Text>
          <Text style={estilosTermosUtilizacao.paragrafo}>
            A empresa
            <Text style={{ fontWeight: 'bold' }}> não será responsável por qualquer dano direto ou indireto </Text>
            decorrente do mau uso do aplicativo por parte do usuário.
          </Text>

          <Text style={estilosTermosUtilizacao.subtitulo}>7. Alterações nos Termos</Text>
          <Text style={estilosTermosUtilizacao.paragrafo}>
            A empresa se reserva o direito de modificar estes Termos de Utilização a qualquer momento.
          </Text>

          <Text style={estilosTermosUtilizacao.subtitulo}>8. Contato</Text>
          <Text style={estilosTermosUtilizacao.paragrafo}>
            Caso necessitar de suporte, entre em contato conosco pelo e-mail: divinobarrasul@gmail.com
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilosTermosUtilizacao = StyleSheet.create({
  conteiner: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
  },
  conteudo: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
  },
  paragrafo: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'justify',
  },
});

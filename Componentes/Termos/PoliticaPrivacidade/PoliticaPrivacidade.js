import React from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'

export default function PoliticaPrivacidade() {
  return (
    <ScrollView style={estilosPoliticaPrivacidade.conteiner}>
      <View style={estilosPoliticaPrivacidade.conteudo}>
        <Text style={estilosPoliticaPrivacidade.titulo}>Política de Privacidade</Text>

        <Text style={estilosPoliticaPrivacidade.paragrafo}>
          A sua privacidade é importante para nós. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais ao utilizar o nosso aplicativo. Ao acessar ou utilizar o nosso app, você concorda com os termos descritos nesta Política.
        </Text>

        <Text style={estilosPoliticaPrivacidade.subtitulo}>1. Dados Coletados</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>
          Nós coletamos as seguintes informações pessoais para fins específicos no nosso aplicativo:
        </Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>- Nome: Coletamos seu nome para fins de identificação e personalização de sua experiência no aplicativo.</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>- E-mail: Coletamos seu e-mail para fins de comunicação, envio de notificações e identificação do usuário.</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>- Data de Nascimento: Coletamos sua data de nascimento para verificar se você é maior de idade e atender aos requisitos legais de restrição de acesso.</Text>

        <Text style={estilosPoliticaPrivacidade.subtitulo}>2. Finalidade da Coleta de Dados</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>
          Os dados pessoais coletados têm as seguintes finalidades:
        </Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>- Identificação e autenticação do usuário.</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>- Envio de notificações e comunicados relevantes para a utilização do app.</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>- Verificação da idade do usuário, garantindo conformidade com as leis aplicáveis.</Text>

        <Text style={estilosPoliticaPrivacidade.subtitulo}>3. Compartilhamento de Dados</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>
          Nós não compartilhamos seus dados pessoais com terceiros, salvo em situações que envolvam:
        </Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>- Cumprimento de obrigações legais ou regulatórias.</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>- Necessidades de operação do aplicativo, com prestadores de serviço que atuam em nosso nome, sempre respeitando as normas da LGPD.</Text>

        <Text style={estilosPoliticaPrivacidade.subtitulo}>4. Segurança dos Dados</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>
          Nós adotamos medidas de segurança adequadas para proteger seus dados pessoais contra acessos não autorizados, uso indevido, alteração ou destruição. No entanto, nenhum método de transmissão pela internet ou armazenamento eletrônico é completamente seguro, e não podemos garantir a segurança absoluta.
        </Text>

        <Text style={estilosPoliticaPrivacidade.subtitulo}>5. Retenção de Dados</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>
          Seus dados pessoais serão mantidos enquanto sua conta estiver ativa ou conforme necessário para cumprir as finalidades descritas nesta Política. Caso você decida excluir sua conta, seus dados pessoais serão removidos, salvo em situações em que seja necessário reter essas informações para cumprir obrigações legais ou contratuais.
        </Text>

        <Text style={estilosPoliticaPrivacidade.subtitulo}>6. Seus Direitos</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>
          De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
        </Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>- Acesso: Você pode solicitar informações sobre os dados pessoais que mantemos sobre você.</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>- Correção: Você pode corrigir dados pessoais imprecisos ou desatualizados.</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>- Exclusão: Você pode solicitar a exclusão dos seus dados pessoais, sujeito às exceções previstas na LGPD.</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>- Portabilidade: Você pode solicitar a portabilidade dos seus dados pessoais para outro fornecedor de serviço, conforme previsto pela legislação.</Text>

        <Text style={estilosPoliticaPrivacidade.paragrafo}>
          Para exercer qualquer um desses direitos, entre em contato conosco por meio dos canais fornecidos no aplicativo.
        </Text>

        <Text style={estilosPoliticaPrivacidade.subtitulo}>7. Alterações nesta Política</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>
          Esta Política de Privacidade pode ser atualizada periodicamente. Quaisquer alterações serão publicadas neste documento com a data de atualização. Recomendamos que você revise esta política regularmente para se manter informado sobre como protegemos seus dados.
        </Text>

        <Text style={estilosPoliticaPrivacidade.subtitulo}>8. Contato</Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>
          Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco por meio dos seguintes canais:
        </Text>
        <Text style={estilosPoliticaPrivacidade.paragrafo}>- Email: divinobarrasul@gmail.com</Text>

        <Text style={estilosPoliticaPrivacidade.paragrafo}>Última atualização: 07/04/2025</Text>
      </View>
    </ScrollView>
  )
}

const estilosPoliticaPrivacidade = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  
  conteudo: {
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
})
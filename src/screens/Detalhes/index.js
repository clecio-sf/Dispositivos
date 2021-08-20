import React from 'react'
import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import CardView from 'react-native-cardview'
import { CardAction } from 'react-native-cards'
import { Header } from 'react-native-elements'
import feedsEstaticos from '../../assets/dicionarios/feeds.json'
import {
  styles, Espacador,
  CentralizadoNaMesmaLinha, EsquerdaDaMesmaLinha
} from '../../assets/style'
import Icon from 'react-native-vector-icons/AntDesign'
import Compartilhador from '../../components/Compartilhador'
import SyncStorage from 'sync-storage'
import Toast from 'react-native-simple-toast'
import { getFeed, getImagem, usuarioGostou, gostar, desgostar } from '../../api'

const TOTAL_IMAGENS_SLIDE = 3
export default class Detalhes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      feedId: this.props.navigation.state.params.feedId,
      feed: null,
      gostou: false
    }
  }

  verificarUsuarioGostou = () => {
    const { feedId, usuario } = this.state;

    usuarioGostou(usuario, feedId).then((resultado) => {
      this.setState({ gostou: (resultado.likes > 0) });
    }).catch((erro) => {
      console.log("erro verificando se usuario gostou: " + erro);
    });
  }

  carregarFeed = () => {
    const { feedId } = this.state;

    getFeed(feedId).then((feedAtualizado) => {
      this.setState({
        feed: feedAtualizado
      }, () => {
        this.verificarUsuarioGostou();
      });
    }).catch((erro) => {
      console.error("erro atualizando o feed: " + erro);
    });
  }

  componentDidMount = () => {

    this.carregarFeed()
  }

  mostrarSlides = () => {
    const { feed } = this.state
    let slides = []
    for (let i = 0; i < TOTAL_IMAGENS_SLIDE; i++) {
      if (feed.product.blobs[i].file) {
        slides = [...slides, getImagem(feed.product.blobs[i].file)]
      }
    }

    return (
      <SliderBox
        dotColor={'#f1faee'}
        inactiveDotColor={'#5995ed'}
        resizeMethod={'resize'}
        resizeMod={'cover'}
        dotStyle={{ width: 9, height: 9, borderRadius: 9, marginHorizontal: 5 }}
        images={slides}
      />
    )
  }

  like = () => {
    const { usuario, feedId } = this.state;
    this.carregarFeed()
    gostar(usuario, feedId).then((resultado) => {
      if (resultado.situacao === 'ok') {
        console.log('aqui')
        this.carregarFeed();
        Toast.show("Obrigado pela sua avaliação", Toast.LONG);
      } else {
        Toast.show("Ocorreu um erro nessa operação", Toast.LONG);
      }
    }).catch((erro) => {
      console.log("erro registrando like: " + erro);
      console.log('erro aqui')

    })
  }


  dislike = () => {
    const { feedId, usuario } = this.state;

    desgostar(usuario, feedId).then((resultado) => {
      if (resultado.situacao === "ok") {
        this.carregarFeed();
      } else {
        Toast.show("Ocorreu um erro nessa operação", Toast.LONG);
      }
    }).catch((erro) => {
      console.log("erro registrando like: " + erro);
    })
  }

  render = () => {
    const { feed, gostou } = this.state
    const usuario = SyncStorage.get('user')
    if (feed) {
      return (
        <>
          <Header
            leftComponent={
              <Icon size={28} name='left' color={'#1d3557'} onPress={() => {
                this.props.navigation.goBack()
              }}></Icon>
            }
            centerComponent={<></>}
            rightComponent={
              <CentralizadoNaMesmaLinha>
                <Compartilhador feed={feed} />
                <Espacador />
                {gostou && usuario && <Icon name='heart' size={28} color={'#e63946'} onPress={
                  () => {
                    this.dislike()
                  }
                } />}
                {!gostou && usuario && <Icon name='hearto' size={28} color={'#e63946'} onPress={
                  () => {
                    this.like()
                  }
                }
                />}
              </CentralizadoNaMesmaLinha>
            }
            containerStyle={styles.cabecalho}
          >
          </Header>


          <SafeAreaView style={styles.safeAreaView}>
            <ScrollView style={styles.scrollView}>
              <CardView
                cardElevation={2}
                cornerRadius={0}>
                {this.mostrarSlides()}
                <Text style={styles.NomeProdutoDetalhes}>{feed.product.name}</Text>
                <EsquerdaDaMesmaLinha>
                  <Icon style={styles.icone} name='hearto' size={18} color={'#e63946'}>
                    <Text style={styles.likes}>{feed.likes}</Text>
                  </Icon>
                  <Espacador />

                  {usuario && <Icon name='message1' size={18} onPress={
                    () => {
                      this.props.navigation.navigate('Comentarios',
                        {
                          feedId: feed._id,
                          produto: feed.product
                        })
                    }
                  } />}
                </EsquerdaDaMesmaLinha>
              </CardView>
              <CardAction
                separator={true}>
              </CardAction>
              <View style={styles.container}>
                <View flexDirection='row'>
                  <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={0}
                    style={styles.card}>
                    <Text style={styles.titulosDetalhes}>Ingredientes</Text>
                    <Text style={styles.receita}>{feed.product.recipe}</Text>
                  </CardView>
                </View>
              </View>
              <CardAction
                separator={true}>
              </CardAction>
              <View style={styles.container}>
                <View flexDirection='row'>
                  <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={0}
                    style={styles.card}>
                    <Text style={styles.titulosDetalhes}>Modo de Preparo</Text>
                    <Text style={styles.receita}>{feed.product.steps}</Text>
                  </CardView>
                </View>
              </View>
            </ScrollView>

          </SafeAreaView >
        </>
      )
    } else {
      return (null)
    }
  }
}



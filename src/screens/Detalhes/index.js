import React from 'react'
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box'
import CardView from 'react-native-cardview'
import { CardAction } from 'react-native-cards'
import { Header } from 'react-native-elements';
import feedsEstaticos from '../../assets/dicionarios/feeds.json'
import { styles, Espacador, CentralizadoNaMesmaLinha, EsquerdaDaMesmaLinha } from '../../assets/style'
import Icon from 'react-native-vector-icons/AntDesign'
import slide1 from '../../assets/imgs/slide1.jpeg'
import slide2 from '../../assets/imgs/slide2.jpeg'
import slide3 from '../../assets/imgs/slide3.jpeg'
import Compartilhador from '../../components/Compartilhador';
import SyncStorage from "sync-storage";
import Toast from "react-native-simple-toast";


export default class Detalhes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      feedId: this.props.navigation.state.params.feedId,
      feed: null,
      gostou: false
    }
  }
  carregarFeed = () => {
    const { feedId } = this.state
    const feeds = feedsEstaticos.feeds
    const feedsFiltrados = feeds.filter((feed) => feed._id === feedId)
    if (feedsFiltrados.length) {
      this.setState({
        feed: feedsFiltrados[0]
      })
    }
  }

  componentDidMount = () => {
    this.carregarFeed()
  }

  mostrarSlides = () => {
    const slides = [slide1, slide2, slide3]
    return (
      <SliderBox
        dotColor={'#ffad05'}
        inactiveDotColor={'#5995ed'}
        resizeMethod={'resize'}
        resizeMod={'cover'}
        dotStyle={{ width: 9, height: 9, boderRadius: 9, marginHorizontal: 5 }}
        images={slides}
      />
    )
  }

  like = () => {
    const { feed } = this.state;
    const usuario = SyncStorage.get("user");

    console.log("adicionando o like do usuário: " + usuario.name);
    feed.likes++;

    this.setState({
      feed: feed,
      gostou: true
    }, () => {
      Toast.show("Obrigado pela sua avaliação!", Toast.LONG);
    });
  }

  dislike = () => {
    const { feed } = this.state;
    const usuario = SyncStorage.get("user");

    console.log("removendo o like do usuário: " + usuario.name);
    feed.likes--;

    this.setState({
      feed: feed,
      gostou: false
    });
  }

  render = () => {
    const { feed, gostou } = this.state
    const usuario = SyncStorage.get('user')
    if (feed) {
      return (
        <>
          <Header
            leftComponent={
              <Icon size={28} name='left' onPress={() => {
                this.props.navigation.goBack()
              }}></Icon>
            }
            centerComponent={<></>}
            rightComponent={
              <CentralizadoNaMesmaLinha>
                <Compartilhador feed={feed} />
                <Espacador />
                {gostou && usuario && <Icon name="heart" size={28} color={"#ff0000"} onPress={
                  () => {
                    this.dislike();
                  }
                } />}
                {!gostou && usuario && <Icon name="hearto" size={28} color={"#ff0000"} onPress={
                  () => {
                    this.like();
                  }
                } />}
              </CentralizadoNaMesmaLinha>
            }>
          </Header>


          <SafeAreaView style={styles.safeAreaView}>
            <ScrollView style={styles.scrollView}>
              <CardView
                cardElevation={2}
                cornerRadius={0}>
                {this.mostrarSlides()}
                <Text style={styles.NomeProdutoDetalhes}>{feed.product.name}</Text>
                <EsquerdaDaMesmaLinha>
                  <Icon style={styles.icone} name="hearto" size={18} color={'#ffa500'}>
                    <Text style={styles.likes}>{feed.likes}</Text>
                  </Icon>
                  <Espacador />

                  {usuario && <Icon name="message1" size={18} onPress={
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
                <View flexDirection="row">
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
                <View flexDirection="row">
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



import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box'
import CardView from 'react-native-cardview'
import { Card, CardImage, CardContent, CardTitle, CardAction } from 'react-native-cards'
import { Header } from 'react-native-elements';
import feedsEstaticos from '../../assets/dicionarios/feeds.json'
import { DescricaoProduto, NomeProduto, PrecoProduto, Alinhar, Likes } from '../../assets/style'
import Icon from 'react-native-vector-icons/AntDesign'
import slide1 from '../../assets/imgs/slide1.jpeg'
import slide2 from '../../assets/imgs/slide2.jpeg'
import slide3 from '../../assets/imgs/slide3.jpeg'
import Compartilhador from '../../components/Compartilhador';
export default class Detalhes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      feedId: this.props.navigation.state.params.feedId,
      feed: null
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


  render = () => {
    const { feed } = this.state
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
              <>
                <Compartilhador feed={feed} />
              </>
            }>
          </Header>


          <SafeAreaView style={styles.safeAreaView}>
            <ScrollView style={styles.scrollView}>
              <CardView
                cardElevation={2}
                cornerRadius={0}>
                {this.mostrarSlides()}
                <Text style={styles.NomeProdutoDetalhes}>{feed.product.name}</Text>
                {/* <Text style={styles.descricao}>{feed.product.description}
                </Text> */}
                <Icon style={styles.icone} name="hearto" size={18} color={'#ffa500'}>
                  <Likes>{feed.likes}</Likes>
                </Icon>

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
                    <Text style={styles.text}>Igredientes</Text>
                    <Text tyle={styles.text}>{feed.product.preparo}</Text>
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
                    <Text style={styles.text}>Preparo</Text>
                    <Text tyle={styles.text}>{feed.product.preparo}</Text>
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
} const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  container: {
    flex: 1
    // backgroundColor: '#EEEEEE',
  },
  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,

  },
  text: {
    textAlign: 'center',
    margin: 10,
    height: 'auto'
  },
  NomeProdutoDetalhes: {
    fontSize: 26,
    color: '#ffa500',
    paddingLeft: 4,
    paddingBottom: 5,
  },
  descricao: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 10,
    textAlign: 'justify'
  },
  icone: {
    paddingLeft: 4,
    paddingBottom: 6
  },
  scrollView: {
    marginHorizontal: 1,
  },

});
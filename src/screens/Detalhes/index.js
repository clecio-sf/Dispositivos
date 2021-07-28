import React from 'react'
import { Text } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import CardView from 'react-native-cardview'
import feedsEstaticos from '../../assets/dicionarios/feeds.json'
import { DescricaoProduto, NomeProduto, PrecoProduto, Likes } from '../../assets/style'
import Icon from 'react-native-vector-icons/AntDesign'
import slide1 from '../../assets/imgs/slide1.jpeg'
import slide2 from '../../assets/imgs/slide2.jpeg'
import slide3 from '../../assets/imgs/slide3.jpeg'

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
        <CardView
          cardElevation={2}
          cornerRadius={0}>
          {this.mostrarSlides()}
          <NomeProduto>{feed.product.name}</NomeProduto>
          <DescricaoProduto>{feed.product.description}</DescricaoProduto>
          <PrecoProduto>R$ {feed.product.price}</PrecoProduto>
          <Icon name='heart' size={18}>
            <Likes>{feed.Likes}</Likes>
          </Icon>
        </CardView>
      )
    } else {
      return (null)
    }
  }
}
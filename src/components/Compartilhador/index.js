import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { Share } from 'react-native'

export default class Compartilhador extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feed: this.props.feed
    }
  }

  compartilhar = () => {
    const { feed } = this.state
    const mensagem = 'Veja mais detalhes dessa receita em :\n\n' + feed.product.url
    const resultado = Share.share({
      title: feed.product.name,
      message: mensagem
    })
  }

  render = () => {
    return (
      <Icon name='sharealt' size={24} color={'#1d3557'} onPress={() => {
        this.compartilhar()
      }} />
    )
  }
}
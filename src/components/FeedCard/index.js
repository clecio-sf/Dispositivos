import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Card, CardImage, CardContent } from 'react-native-cards'
import { Avatar, NomeEmpresa, NomeProduto, DescricaoProduto, PrecoProduto, Likes } from '../../assets/style';
import avatar from '../../assets/imgs/avatar.jpeg';
import produto from '../../assets/imgs/produto.jpeg';
import Icon from 'react-native-vector-icons/AntDesign'


export default class FeedCard extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      feed: this.props.feed,
      navegador: this.props.navegador
    }
  }
  render = () => {
    const { feed, navegador } = this.state
    return (
      <TouchableOpacity onPress={
        () => {
          navegador.navigate('Detalhes', { feedId: feed._id })
        }
      }>
        <Card>
          <CardImage source={produto} />
          <CardContent>
            <Avatar source={avatar} />
            <NomeEmpresa>{feed.company.name}</NomeEmpresa>
          </CardContent>
          <CardContent>
            <NomeProduto>{feed.product.name}</NomeProduto>
          </CardContent>
          <CardContent>
            <DescricaoProduto>{feed.product.description}</DescricaoProduto>
          </CardContent>
          <CardContent>
            <PrecoProduto>{'R$' + feed.product.price}</PrecoProduto>
            <Icon name="heart" size={14} >
              <Likes>{feed.likes}</Likes>
            </Icon>
          </CardContent>
        </Card>
      </TouchableOpacity >)
  }
}
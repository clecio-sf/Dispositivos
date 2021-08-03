import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, View } from "react-native";
import { Card, CardImage, CardContent, CardTitle, CardAction } from 'react-native-cards'
import {
  Avatar, NomeEmpresa, styles,
  DescricaoProduto, PrecoProduto, Likes, EsquerdaDaMesmaLinha, Centro, Titulo, Alinhar
} from '../../assets/style';
import { Text } from 'react-native'
import avatar from '../../assets/imgs/avatar.jpeg';
import produto from '../../assets/imgs/stro.jpg';
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
          <CardAction
            separator={true} >
          </CardAction>
          <CardTitle
            subtitle={feed.category.name}
          />
          <Text style={styles.NomeProduto}>
            {feed.product.name}
          </Text>
          <CardContent>
            <CardAction
              separator={true} >
            </CardAction>
            <Alinhar>
              <Icon name="hearto" size={18} color={'#ffa500'}>
                <Likes>{feed.likes}</Likes>
              </Icon>
            </Alinhar>
          </CardContent>
        </Card>
      </TouchableOpacity >)
  }
}

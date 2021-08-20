import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Card, CardImage, CardContent, CardTitle, CardAction } from 'react-native-cards'
import { styles, Alinhar } from '../../assets/style'
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { getImagem } from '../../api'
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
          <CardImage source={getImagem(feed.product.blobs[0].file)} />
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
              <Icon name='heart' size={18} color={'#e63946'}>
                <Text style={styles.likes}>{feed.likes}</Text>
              </Icon>
            </Alinhar>
          </CardContent>
        </Card>
      </TouchableOpacity >)
  }
}

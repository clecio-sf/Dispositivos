import React from 'react'
import { Text } from 'react-native'

export default class Detalhes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      feedId: this.props.navigation.state.params.feedId
    }
  }

  render = () => {
    const { feedId } = this.state
    return (<Text>Detalhes do produto com id{feedId}</Text>)
  }
}
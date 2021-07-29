import React from 'react';
import { View, FlatList } from 'react-native'
import feedsEstaticos from "../../assets/dicionarios/feeds.json"
import FeedCard from '../../components/FeedCard';
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import { EntradaNomeProduto, CentralizadoNaMesmaLinha } from '../../assets/style'
const FEEDS_POR_PAGINA = 4

export default class Feeds extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      proximaPagina: 0,
      feeds: [],
      nomeProduto: null,
      atualizando: false,
      carregando: false
    }
  }

  carregarFeeds = () => {
    const { proximaPagina, feeds, nomeProduto } = this.state
    // avisa que esta carregando
    this.setState({
      carregando: true
    })

    //precisa filtrar por nome do produto
    if (nomeProduto) {
      const maisFeeds = feedsEstaticos.feeds.filter((feed) =>
        feed.product.name.toLowerCase().includes(nomeProduto.toLowerCase()))
      this.setState({
        feeds: maisFeeds,
        atualizando: false,
        carregando: false
      })
    } else {
      // carregar o total de feeds por pagina
      const idInicial = proximaPagina * FEEDS_POR_PAGINA + 1
      const idFinal = idInicial + FEEDS_POR_PAGINA - 1
      const maisFeeds = feedsEstaticos.feeds.filter((feed) =>
        feed._id >= idInicial && feed._id <= idFinal)
      if (maisFeeds.length) {
        console.log("add " + maisFeeds.length + "feeds")
        // incrementar a pagina e guardar os feeds
        this.setState({
          proximaPagina: proximaPagina + 1,
          atualizando: false,
          feeds: [...feeds, ...maisFeeds],
          carregando: false
        })
      } else {
        this.setState({
          atualizando: false,
          carregando: false
        })
      }
    }
  }
  componentDidMount = () => {
    this.carregarMaisFeeds()
  }

  carregarMaisFeeds = () => {
    const { carregando } = this.state
    if (carregando) {
      return
    }
    this.carregarFeeds()
  }
  atualizar = () => {
    this.setState({ atualizando: true, feed: [], proximaPagina: 0, nomeProduto: null },
      () => {
        this.carregarFeeds()

      })
  }

  mostrarFeed = (feed) => {
    return (
      <FeedCard feed={feed} navegador={this.props.navigation} />
    )
  }

  atualizarNomeProduto = (nome) => {
    this.setState({
      nomeProduto: nome
    })
  }
  mostrarBarraPesquisa = () => {
    const { nomeProduto } = this.state
    return (
      <CentralizadoNaMesmaLinha>
        <EntradaNomeProduto
          onChangeText={(nome) => { this.atualizarNomeProduto(nome) }}
          value={nomeProduto}
        ></EntradaNomeProduto>
        <Icon style={{ padding: 8 }} size={20} name="search1"
          onPress={
            () => {
              this.carregarFeeds()
            }
          }
        >
        </Icon>
      </CentralizadoNaMesmaLinha>
    )
  }

  mostrarFeeds = (feeds) => {
    const { atualizando } = this.state
    return (
      <>
        <Header
          leftComponent={
            <Icon size={28} name='menuunfold' />
          }
          centerComponent={
            this.mostrarBarraPesquisa()
          }
          rightComponent={
            <></>
          }
        >
        </Header>
        <FlatList
          data={feeds}
          numColumns={2}
          onEndReached={() => this.carregarMaisFeeds()}
          onEndReachedThreshold={0.1}
          onRefresh={() => this.atualizar()}
          refreshing={atualizando}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => {
            return (
              <View style={{ width: '50%' }}>
                {this.mostrarFeed(item)}
              </View>
            )
          }}
        >
        </FlatList>
      </>
    )
  }

  render = () => {
    const { feeds } = this.state
    console.log('exibindo ' + feeds.length + ' feeds')
    if (feeds.length) {
      return (
        this.mostrarFeeds(feeds)
      )
    } else {
      return (
        <View></View>
      )
    }
  }
}
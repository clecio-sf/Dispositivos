import React from 'react'
import { View, FlatList, Text } from 'react-native'
import FeedCard from '../../components/FeedCard'
import { Header, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import {
  EntradaNomeProduto, CentralizadoNaMesmaLinha,
  ContenedorMensagem, styles, Espacador
} from '../../assets/style'
import Menu from '../../components/Menu'
import DrawerLayout from 'react-native-drawer-layout'
import { getFeeds, getFeedsPorProduto, getFeedsPorCategoria, feedAlive } from '../../api'

export default class Feeds extends React.Component {

  constructor(props) {
    super(props)

    this.filtrarPorEmpresa = this.filtrarPorEmpresa.bind(this)

    this.state = {
      proximaPagina: 1,
      feeds: [],

      empresaEscolhida: null,
      nomeProduto: null,
      atualizando: false,
      carregando: false,
      podeVerFeeds: true
    }
  }

  mostrarMaisFeeds = (maisFeeds) => {
    const { proximaPagina, feeds } = this.state;

    if (maisFeeds) {
      console.log("adicionando " + maisFeeds.length + " feeds");

      // incrementar a pagina e guardar os feeds
      this.setState({
        proximaPagina: proximaPagina + 1,
        feeds: [...feeds, ...maisFeeds],

        atualizando: false,
        carregando: false
      });
    } else {
      this.setState({
        atualizando: false,
        carregando: false
      })
    }
  }

  carregarFeeds = () => {
    const { proximaPagina, nomeProduto, empresaEscolhida,
      filtrarPorLikes, usuario } = this.state;
    this.setState({
      carregando: true
    });
    feedAlive().then((resultado) => {
      if (resultado.alive === "yes") {
        this.setState({
          podeVerFeeds: true
        }, () => {
          if (empresaEscolhida) {
            getFeedsPorCategoria(empresaEscolhida._id, proximaPagina).then((maisFeeds) => {
              this.mostrarMaisFeeds(maisFeeds);
            }).catch((erro) => {
              console.log("erro acessando feeds por empresa: " + erro);
            });
          } else if (nomeProduto) {
            getFeedsPorProduto(nomeProduto, proximaPagina).then((maisFeeds) => {
              this.mostrarMaisFeeds(maisFeeds);
            }).catch((erro) => {
              console.error("erro acessando feeds por produto: " + erro);
            });
          } else {
            getFeeds(proximaPagina).then((maisFeeds) => {
              this.mostrarMaisFeeds(maisFeeds);
            }).catch((erro) => {
              console.error("erro acessando feeds: " + erro);
            });
          }

        })
      } else {
        this.setState({
          podeVerFeeds: false
        })
      }
    }).catch((erro) => {
      console.log("erro verificando a disponibilidade do servico: " + erro);
    });
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
    this.setState({ atualizando: true, feeds: [], proximaPagina: 1, nomeProduto: null, empresaEscolhida: null },
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
          value={nomeProduto}>
        </EntradaNomeProduto>
        <Icon style={{ padding: 8 }} size={20} name='search1'
          onPress={
            () => {
              this.setState({
                proximaPagina: 1,
                feeds: []
              }, () => {
                this.carregarFeeds()
              })
            }
          }>
        </Icon>
      </CentralizadoNaMesmaLinha>
    )
  }

  mostrarMenu = () => {
    this.menu.openDrawer()
  }

  filtrarPorEmpresa = (empresa) => {
    this.setState({
      empresaEscolhida: empresa,
      proximaPagina: 1,
      feeds: []
    }, () => {
      this.carregarFeeds()
    })

    this.menu.closeDrawer()
  }

  mostrarFeeds = (feeds) => {
    const { atualizando } = this.state

    return (
      <DrawerLayout
        drawerWidth={250}
        drawerPosition={DrawerLayout.positions.Left}
        ref={drawerElement => {
          this.menu = drawerElement
        }}
        renderNavigationView={() => <Menu filtragem={this.filtrarPorEmpresa} />}
      >
        <Header
          leftComponent={
            <Icon size={28} name='menuunfold' onPress={() => {
              this.mostrarMenu()
            }} />
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
          numColumns={1}
          onEndReached={() => this.carregarMaisFeeds()}
          onEndReachedThreshold={0.1}
          onRefresh={() => this.atualizar()}
          refreshing={atualizando}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => {
            return (
              <View >
                {this.mostrarFeed(item)}
              </View>
            )
          }}
        >
        </FlatList>
      </DrawerLayout>
    )
  }
  mostrarBotaoAtualizar = () => {
    return (
      <ContenedorMensagem>
        <Text style={styles.mensagem}>Um dos nossos serviços não está funcionando :(</Text>
        <Text style={styles.mensagem}>Tente novamente mais tarde</Text>
        <Espacador />
        <Button icon={
          <Icon
            name="reload1"
            size={22}
            color="#fff"
          />
        }
          title="Tentar agora"
          type="solid"
          onPress={
            () => {
              this.carregarFeeds();
            }
          }
        />
      </ContenedorMensagem>
    );
  }

  mostrarMensagemCarregando = () => {
    return (
      <ContenedorMensagem>
        <Text style={styles.mensagem}>esperando feeds</Text>
      </ContenedorMensagem>
    );
  }

  render = () => {
    const { feeds, podeVerFeeds } = this.state;

    if (podeVerFeeds) {
      if (feeds) {
        console.log("exibindo " + feeds.length + " feeds");

        return (
          this.mostrarFeeds(feeds)
        );
      } else {
        return (this.mostrarMensagemCarregando());
      }
    } else {
      return (this.mostrarBotaoAtualizar());
    }
  }

}
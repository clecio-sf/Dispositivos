import React from 'react'
import { FlatList, Text, Modal, TextInput, Alert, View } from 'react-native'
import { Header, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import Swipeable from 'react-native-swipeable-row'
import SyncStorage from 'sync-storage'
import Moment from 'react-moment'
import 'moment-timezone'
import { getComentarios, adicionarComentario, removerComentario } from '../../api'
import {
  styles,
  CentralizadoNaMesmaLinha,
  ContenedorComentarios,
  ContenedorComentarioDoUsuario,
  ContenedorComentarioDeOutroUsuario,
  EspacadorComentario,
  DivisorComentario,
  ContenedorNovoComentario,
  Espacador
} from '../../assets/style'
import Toast from 'react-native-simple-toast'

const TAMANHO_MAXIMO_COMENTARIO = 100

export default class Comentarios extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      feedId: this.props.navigation.state.params.feedId,
      produto: this.props.navigation.state.params.produto,
      empresa: this.props.navigation.state.params.empresa,

      comentarios: [],
      proximaPagina: 1,
      textoNovoComentario: '',

      carregando: false,
      atualizando: false,
      telaAdicaoVisivel: false,
      usuario: null

    }
  }

  carregarComentarios = () => {
    const { feedId, comentarios, proximaPagina } = this.state;

    this.setState({
      carregando: true
    });

    getComentarios(feedId, proximaPagina).then((maisComentarios) => {
      if (maisComentarios.length) {
        this.setState({
          proximaPagina: proximaPagina + 1,
          comentarios: [...comentarios, ...maisComentarios],

          atualizando: false,
          carregando: false
        });
      } else {
        this.setState({
          atualizando: false,
          carregando: false
        })
      }
    }).catch((erro) => {
      console.error("erro exibindo comentarios: " + erro);
    })
  }

  componentDidMount = () => {
    this.carregarComentarios()
  }

  carregarMaisComentarios = () => {
    const { carregando } = this.state
    if (carregando) {
      return
    }

    this.carregarComentarios()
  }

  removerComentario = (comentarioParaRemover) => {

    removerComentario(comentarioParaRemover._id).then((resultado) => {
      if (resultado.situacao == 'ok') {
        this.setState({
          proximaPagina: 1,
          comentarios: []
        }, () => {
          this.carregarComentarios()
        })
      }
    }).catch((erro => {
      console.log('erro ao excluir o comentario ' + erro)
    }))
  }

  confirmarRemocao = (comentario) => {
    Alert.alert(
      null,
      'Remover o seu comentário?',
      [
        { text: 'NÃO', style: 'cancel' },
        { text: 'SIM', onPress: () => this.removerComentario(comentario) }
      ]
    )
  }

  mostrarComentarioDoUsuario = (comentario) => {
    return (
      <>
        <Swipeable
          rightButtonWidth={50}
          rightButtons={[
            <View style={{ padding: 13 }}>
              <Espacador />
              <Icon name='delete' color='#030303' size={28}
                onPress={() => {
                  this.confirmarRemocao(comentario)
                }} />
            </View>
          ]
          }>
          <ContenedorComentarioDoUsuario>
            <Text style={styles.comentario}>{'Você:'}</Text>
            <Text style={styles.comentario}>{comentario.content}</Text>
            <Text style={styles.comentario}>
              <Moment element={Text} parse='YYYY-MM-DD HH:mm'
                format='DD/MM/YYYY HH:mm'>
                {comentario.datetime}
              </Moment>
            </Text>
          </ContenedorComentarioDoUsuario>
        </Swipeable>
        <EspacadorComentario />
      </>
    )
  }

  mostrarComentarioDeOutroUsuario = (comentario) => {
    return (
      <>
        <ContenedorComentarioDeOutroUsuario>
          <Text style={styles.comentario}>{comentario.user.name}</Text>
          <Text style={styles.comentario}>{comentario.content} </Text>
          <Text style={styles.comentario}>
            <Moment element={Text} parse='YYYY-MM-DD HH:mm'
              format='DD/MM/YYYY HH:mm'>
              {comentario.datetime}
            </Moment>
          </Text>
          <EspacadorComentario />
        </ContenedorComentarioDeOutroUsuario>
        <EspacadorComentario />
      </>
    )
  }

  atualizar = () => {
    this.setState({
      atualizando: true, carregando: false, proximaPagina: 1,
      comentarios: []
    }, () => {
      this.carregarComentarios()
    })
  }

  adicionarComentario = () => {
    const { feedId, textoNovoComentario } = this.state;

    adicionarComentario(feedId, textoNovoComentario).then(
      (resultado) => {
        if (resultado.situacao == "ok") {
          this.setState({
            proximaPagina: 1,
            comentarios: []
          }, () => {
            this.carregarComentarios();
          })
        }
      }
    ).catch((erro) => {
      console.error("erro adicionando comentario: " + erro);
    })
    this.mudarVisibilidadeTelaAdicao()
  }

  mudarVisibilidadeTelaAdicao = () => {
    const { telaAdicaoVisivel } = this.state

    this.setState({ telaAdicaoVisivel: !telaAdicaoVisivel })
  }

  atualizarTextoNovoComentario = (texto) => {
    this.setState({
      textoNovoComentario: texto
    })
  }

  mostrarTelaAdicaoComentario = () => {
    return (
      <Modal
        animationType='slide'
        transparent={true}

        onRequestClose={
          () => {
            this.atualizar()
          }
        }
      >
        <ContenedorNovoComentario>
          <TextInput
            multiline={true}
            numberOfLines={3}

            editable={true}

            placeholder={'Digite um comentário'}
            maxLength={TAMANHO_MAXIMO_COMENTARIO}

            onChangeText={(texto) => {
              this.atualizarTextoNovoComentario(texto)
            }}
          />
          <DivisorComentario />
          <Espacador />
          <CentralizadoNaMesmaLinha>
            <Button
              icon={
                <Icon name='check'
                  size={22}
                  color='#fff' />
              }

              title='Gravar'
              type='solid'

              onPress={
                () => {
                  this.adicionarComentario()
                }
              }
            />
            <Espacador />
            <Button
              icon={
                <Icon name='closecircle'
                  size={22}
                  color='#fff' />
              }

              title='Cancelar'
              type='solid'

              onPress={
                () => {
                  this.mudarVisibilidadeTelaAdicao()
                }
              }
            />
          </CentralizadoNaMesmaLinha>
          <Espacador />
        </ContenedorNovoComentario>
      </Modal>
    )
  }

  mostrarComentarios = () => {
    const { produto, comentarios, atualizando } = this.state
    const usuario = SyncStorage.get('user')

    return (
      <>
        <Header
          leftComponent={
            <Icon name='left' size={28} onPress={() => {
              this.props.navigation.goBack()
            }
            } />
          }

          centerComponent={
            <CentralizadoNaMesmaLinha>
              <Text style={styles.NomeProduto}> {produto.name}</Text>
            </CentralizadoNaMesmaLinha>
          }

          rightComponent={
            <Icon name='pluscircleo' size={28} onPress={
              () => {
                this.mudarVisibilidadeTelaAdicao()
              }
            } />
          }

          containerStyle={styles.cabecalho}
        />
        <ContenedorComentarios>
          <FlatList
            data={comentarios}
            onEndReached={() => { this.carregarMaisComentarios() }}
            onEndReachedThreshold={0.1}
            onRefresh={() => { this.atualizar() }}
            refreshing={atualizando}
            keyExtractor={(item) => String(item._id)}
            renderItem={({ item }) => {
              if (item.user.email == usuario.email) {
                return this.mostrarComentarioDoUsuario(item)
              } else {
                return this.mostrarComentarioDeOutroUsuario(item)
              }
            }
            }
          />
        </ContenedorComentarios>
      </>
    )
  }

  render = () => {
    const { comentarios, telaAdicaoVisivel } = this.state

    if (comentarios) {
      return (
        <>
          {this.mostrarComentarios()}
          {telaAdicaoVisivel && this.mostrarTelaAdicaoComentario()}
        </>)
    } else {
      return null
    }
  }

}


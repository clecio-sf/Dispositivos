import React from 'react'
import { Text, ScrollView, TouchableOpacity } from 'react-native'
import {
  ContenedorMenu, EsquerdaDaMesmaLinha,
  DivisorMenu, styles
} from '../../assets/style'
import { LoginOptionsMenu } from '../../components/Login'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import Toast from 'react-native-simple-toast'
import { getCategorias } from "../../api";

export default class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      atualizar: true,
      filtrar: props.filtragem,
      categorias: []
    }
  }
  componentDidMount = () => {
    getCategorias().then((maisCategorias) => {
      this.setState({
        categorias: maisCategorias
      });
    }).catch((erro) => {
      console.error("ocorreu um erro criando menu de categorias: " + erro);
    });
  }
  mostrarCategoria = (categoria) => {
    const { filtrar } = this.state
    return (
      <TouchableOpacity onPress={() => {
        filtrar(categoria)
      }}>
        <EsquerdaDaMesmaLinha>
          <Text style={styles.categoria}>{categoria.name}</Text>
        </EsquerdaDaMesmaLinha>
        <DivisorMenu />
      </TouchableOpacity>
    )
  }

  onLogin = (usuario) => {
    this.setState({
      atualizar: true
    }, () => {
      Toast.show("Logado com sucesso na sua conta" + usuario.signer, Toast.LONG)

    })
  }

  onLogout = (signer) => {
    this.setState({
      atualizar: true
    }, () => {
      Toast.show("Deslogado com sucesso de sua conta" + signer)
    })
  }
  render = () => {
    const { categorias } = this.state

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets =>
          <ScrollView style={{ paddingTop: insets.top }}>
            <LoginOptionsMenu onLogin={this.onLogin} onLogout={this.onLogout} />
            <ContenedorMenu>
              {categorias.map((categoria) => this.mostrarCategoria(categoria))}
            </ContenedorMenu>
          </ScrollView>
        }
      </SafeAreaInsetsContext.Consumer>
    );
  }
}
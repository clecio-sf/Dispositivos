import React from 'react'
import { Text, ScrollView, TouchableOpacity } from 'react-native'
import empresasEstaticas from '../../assets/dicionarios/empresas.json'
import {
  Avatar, ContenedorMenu,
  EsquerdaDaMesmaLinha, DivisorMenu, styles
} from '../../assets/style'
import avatar from '../../assets/imgs/avatar.jpeg'
import { LoginOptionsMenu } from '../../components/Login'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import Toast from 'react-native-simple-toast'
export default class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      atualizar: true,
      filtrar: props.filtragem
    }
  }

  mostrarEmpresa = (empresa) => {
    const { filtrar } = this.state
    return (
      <TouchableOpacity onPress={() => {
        filtrar(empresa)
      }}>
        <EsquerdaDaMesmaLinha>
          <Avatar source={avatar}></Avatar>
          <Text style={styles.categoria}>{empresa.name}</Text>
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
    const empresas = empresasEstaticas.empresas;

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets =>
          <ScrollView style={{ paddingTop: insets.top }}>
            <LoginOptionsMenu onLogin={this.onLogin} onLogout={this.onLogout} />
            <ContenedorMenu>
              {empresas.map((empresa) => this.mostrarEmpresa(empresa))}
            </ContenedorMenu>
          </ScrollView>
        }
      </SafeAreaInsetsContext.Consumer>
    );
  }
}
import { IsConstructor } from 'es-abstract'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import empresasEstaticas from '../../assets/dicionarios/empresas.json'
import {
  Avatar, NomeEmpresa, ContenedorMenu,
  EsquerdaDaMesmaLinha, DivisorMenu, Espacador
} from '../../assets/style'
import avatar from '../../assets/imgs/avatar.jpeg'
import { LoginOptionsMenu } from '../../components/Login'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
export default class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
          <NomeEmpresa>{empresa.name}</NomeEmpresa>
        </EsquerdaDaMesmaLinha>
        <DivisorMenu />
      </TouchableOpacity>
    )
  }

  render = () => {
    const empresas = empresasEstaticas.empresas;

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets =>
          <ScrollView style={{ paddingTop: insets.top }}>
            <LoginOptionsMenu />
            <ContenedorMenu>
              {empresas.map((empresa) => this.mostrarEmpresa(empresa))}
            </ContenedorMenu>
          </ScrollView>
        }
      </SafeAreaInsetsContext.Consumer>
    );
  }
}
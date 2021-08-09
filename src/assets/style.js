import styled from 'styled-components/native'
import { StyleSheet } from "react-native";

export const Avatar = styled.Image`
    padding: 4px;
    width: 36px;
    height: 36px
    border-radius: 18px
`;

export const Espacador = styled.View`
    flexDirection: row;
    padding: 8px;
`;

export const EntradaNomeProduto = styled.TextInput`
    height: 40px;
    width: 100%;
    background-color: #fff;
    border-color: #c7c7c7;
    border-width: 1;
    border-radius: 18px;
`;

export const CentralizadoNaMesmaLinha = styled.View`
    flexDirection: row;
    justify-content: center;
    align-items: center;
`;


export const EsquerdaDaMesmaLinha = styled.View`
    flexDirection: row;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const ContenedorMenu = styled.View`
    flex: 1;
    font-size: 18;
    background-color: #fff;
`;

export const DivisorMenu = styled.View`
    marginVertical: 5;
    marginHorizontal: 5;
    border-bottom-width: 1;
    border-color: #050505;
`;

export const Alinhar = styled.View`
    align-items: center;
    padding-top:10px;  
`;

export const ContenedorComentarios = styled.View`
    flexDirection: column;
    width: 100%;
    height: 100%;
    background-color: #fff;
`;

export const DivisorComentario = styled.View`
marginVertical: 5;
marginHorizontal: 5;

border-bottom-width: 1;
borderColor: #3f6ea3;
`;

export const ContenedorComentarioDoUsuario = styled.View`
background-color: #ffefbd;
`;

export const ContenedorComentarioDeOutroUsuario = styled.View`
background-color: #eff2f1;
`;

export const EspacadorComentario = styled.View`
marginVertical: 10;
`;

export const ContenedorNovoComentario = styled.View`
margin-top: 100;
align-self: center;
width: 95%;
border-color: #7ca982;
border-width: 1;
border-radius: 6;
background-color: #fffcf9;
`;

export const AutorComentario = styled.Text`
padding: 6px;
font-size: 16;
color: #283044;
`;

export const Comentarios = styled.Text`
padding: 6px;
font-size: 16;
color: #283044;
`;

export const DataComentario = styled.Text`
padding: 6px;
font-size: 16;
color: #283044;
`;

export const Cabecalho = {
    backgroundColor: '#f0f0f0',
    justifyContent: 'space-evenly',
    borderBottomWidth: 0
}


export const styles = StyleSheet.create({
    NomeProduto: {
        fontSize: 26,
        color: '#ffa500',
        textAlign: 'center',
        paddingLeft: 16,
        paddingBottom: 5,
    },
    NomeProdutoDetalhes: {
        fontSize: 26,
        color: '#ffa500',
        paddingLeft: 4,
        paddingBottom: 25
    },
    receita: {
        fontSize: 16
    },
    likes: {
        fontSize: 20,
        color: '#59594a',
        position: 'relative'
    },
    categoria: {
        padding: 8,
        fontSize: 16,
        color: '#59594a'
    },
    titulosDetalhes: {
        fontSize: 17,
        margin: 10,
        height: 'auto',
        alignSelf: 'center',
        color: '#ffa500',
        textTransform: 'uppercase',
        letterSpacing: 2,
        paddingBottom: 8
    },
    descricao: {
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 10,
        textAlign: 'justify'
    },
    icone: {
        paddingLeft: 4,
        paddingBottom: 10
    },
    card: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 4
    },
    safeAreaView: {
        flex: 1
    },
    scrollView: {
        marginHorizontal: 1,
    },
    container: {
        flex: 1
    }
});

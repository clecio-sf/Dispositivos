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
        paddingBottom: 5,
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
    text: {
        textAlign: 'center',
        margin: 10,
        height: 'auto'
    },
    descricao: {
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 10,
        textAlign: 'justify'
    },
    icone: {
        paddingLeft: 4,
        paddingBottom: 6
    },
    card: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
    },
    safeAreaView: {
        flex: 1
    },
    scrollView: {
        marginHorizontal: 1,
    },
    container: {
        flex: 1
        // backgroundColor: '#EEEEEE',
    }
});

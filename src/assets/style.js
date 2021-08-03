import styled from 'styled-components/native'
import { StyleSheet } from "react-native";

export const Avatar = styled.Image`
    padding: 4px;
    width: 36px;
    height: 36px
    border-radius: 18px
`;
export const Nome = styled.Text`
    padding: 8px;
    font-size: 16;
    color: #59594a;
`;

export const NomeProduto = styled.Text`
    font-size: 16;
    font-weight: bold;
    color: #fff000;
`;

export const NomeEmpresa = styled.Text`
    padding: 8px;
    font-size: 16;
    color: #59594a;
`;

export const DescricaoProduto = styled.Text`
    font-size: 14;
    color: #59594a;
    text-align: justify;
`;

export const PrecoProduto = styled.Text`
    font-size: 14;
    font-weight: bold;
    color: #59594a;
`;

export const Likes = styled.Text`
    font-size: 20;
    color: #59594a;
    position: relative;
    
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

export const Espacador = styled.View`
    flexDirection: row;
    padding: 19px;
`;

export const Centro = styled.Text`
    width: 100%;
    text-align: center;
    color: #c5c5c5;
    padding: 4px;
    font-size: 16;
`;

export const Titulo = styled.Text`
    width: 100%;
    text-align: center;
    color: #000;
    padding-top: 4px;
    font-size: 22;
`;

export const Alinhar = styled.View`
    align-items: center;
    padding-top:10px;  
`;

export const Teste = styled.View`
flex: 1
`;

export const styles = StyleSheet.create({
    NomeProduto: {
        fontSize: 26,
        color: '#ffa500',
        textAlign: 'center',
        paddingLeft: 16,
        paddingBottom: 5,

    },
    safeAreaView: {
        flex: 1
    },
});

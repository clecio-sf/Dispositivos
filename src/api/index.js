import SyncStorage from 'sync-storage'


const FEEDS_URL = "http://192.168.0.102:5001/"
const CATEGORIAS_URL = "http://192.168.0.102:5002/"
const ARQUIVOS_URL = "http://192.168.0.102:5006/"
const LIKES_URL = "http://192.168.0.102:5004/"
const COMENTARIOS_URL = "http://192.168.0.102:5003/"



export const acessarUrl = async (url) => {
  let promise = null

  try {
    resposta = await fetch(url, { method: "GET" })
    if (resposta.ok) {
      promise = Promise.resolve(resposta.json())
    } else {
      promise = Promise.reject(resposta)
    }
  } catch (erro) {
    promise = Promise.reject(erro)
  }
  return promise
}

export const getFeeds = async (pagina) => {
  return acessarUrl(FEEDS_URL + "feeds/" + pagina)
}

export const getFeed = async (feedId) => {
  return acessarUrl(FEEDS_URL + "feed/" + feedId)
}

export const getFeedsPorProduto = async (nomeProduto, pagina) => {
  return acessarUrl(FEEDS_URL + "feeds_por_produto/" + nomeProduto + "/" + pagina, { method: "GET" })
}

export const getFeedsPorCategoria = async (categoriaId, pagina) => {
  return acessarUrl(FEEDS_URL + "feeds_por_categoria/" + categoriaId + "/" + pagina, { method: "GET" })
}

export const getCategorias = async () => {
  return acessarUrl(CATEGORIAS_URL + "categoria")
}

export const usuarioGostou = async (usuario, feedId) => {
  let promise = null;

  if (usuario) {
    promise = acessarUrl(LIKES_URL + "gostou/" + usuario.account + "/" + feedId);
  }

  return promise;
}

export const gostar = async (usuario, feedId) => {
  let promise = null;

  if (usuario) {
    promise = acessarUrl(LIKES_URL + "gostar/" + usuario.account + "/" + feedId);
  }

  return promise;
}

export const desgostar = async (usuario, feedId) => {
  let promise = null;

  if (usuario) {
    promise = acessarUrl(LIKES_URL + "desgostar/" + usuario.account + "/" + feedId);
  }

  return promise;
}

export const getImagem = (imagem) => {
  return { uri: ARQUIVOS_URL + imagem }
}

export const getComentarios = async (feedId, pagina) => {
  return acessarUrl(COMENTARIOS_URL + "comentarios/" + feedId + "/" + pagina);
}

export const adicionarComentario = async (feedId, comentario) => {
  let promise = null;

  const usuario = SyncStorage.get('user')
  if (usuario) {
    promise = acessarUrl(COMENTARIOS_URL + "adicionar/" + feedId + "/" + usuario.name + "/" + usuario.account + "/" + comentario);
  }

  return promise;
}

export const removerComentario = async (comentarioId) => {
  let promise = null
  const usuario = SyncStorage.get('user')

  if (usuario) {
    return acessarUrl(COMENTARIOS_URL + "remover/" + comentarioId);
  }

  return promise;

}




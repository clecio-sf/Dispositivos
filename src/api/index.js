const FEEDS_URL = "http://192.168.0.102:5001/"
const CATEGORIAS_URL = "http://192.168.0.102:5002/"
const ARQUIVOS_URL = "http://192.168.0.102:5006/"




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

export const getFeedsPorProduto = async (nomeProduto, pagina) => {
  return acessarUrl(FEEDS_URL + "feeds_por_produto/" + nomeProduto + "/" + pagina, { method: "GET" })
}

export const getFeedsPorCategoria = async (categoriaId, pagina) => {
  return acessarUrl(FEEDS_URL + "feeds_por_categoria/" + categoriaId + "/" + pagina, { method: "GET" })
}

export const getCategorias = async () => {
  return acessarUrl(CATEGORIAS_URL + "categoria")
}

export const getImagem = (imagem) => {
  return { uri: ARQUIVOS_URL + imagem }
}


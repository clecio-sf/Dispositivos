const FEEDS_URL = "http://192.168.0.102:5001/"


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

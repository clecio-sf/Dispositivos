from flask import Flask, jsonify
import mysql.connector as mysql

servico = Flask(__name__)

IS_ALIVE = 'yes'
DEBUG = True
TAMANHO_PAGINA = 4

MYSQL_SERVER = 'bd'
MYSQL_USER = 'root'
MYSQL_PASS = 'admin'
MYSQL_BANCO = 'receitas'
MYSQL_PORT = '3306'


def get_conexao_bd():
    conexao = mysql.connect(
        host=MYSQL_SERVER, user=MYSQL_USER, password=MYSQL_PASS, database=MYSQL_BANCO, port=MYSQL_PORT)

    return conexao


def gerar_feed(registro):
    feed = {
        "_id": registro["feed_id"],
        "datetime": registro["data"],
        "category": {
            "_id": registro["categoria_id"],
            "name": registro["nome_empresa"],
        },
        "likes": registro["likes"],
        "product": {
            "name": registro["nome_produto"],
            "recipe": registro["receita"],
            "steps": registro["passos_receita"],
            "blobs": [
                {
                    "type": "image",
                    "file": registro["imagem1"]
                },
                {
                    "type": "image",
                    "file": registro["imagem2"]
                },
                {
                    "type": "image",
                    "file": registro["imagem3"]
                }
            ]
        }
    }

    return feed


def get_total_likes(feed_id):
    conexao = get_conexao_bd()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute(
        f"select count(*) as num_likes from likes where feed = {feed_id}")
    resultado = cursor.fetchone()
    if resultado:
        likes = resultado['num_likes']

    return likes


@servico.route('/feeds/<int:pagina>')
def get_feeds(pagina):
    feeds = []
    conexao = get_conexao_bd()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute(
        "select feeds.id as feed_id, DATE_FORMAT(feeds.data, '%Y-%m-%d T') as data," +
        "categoria.id as categoria_id, categoria.nome as nome_empresa, " +
        "produtos.nome as nome_produto, produtos.receita as receita, " +
        "produtos.passos as passos_receita ," +
        "produtos.imagem1, IFNULL(produtos.imagem2, '') as imagem2, IFNULL(produtos.imagem3, '') as imagem3 " +
        "from feeds, produtos, categoria " +
        "where produtos.id = feeds.produto " +
        "and categoria.id = produtos.categoria " +
        "order by data desc " +
        "limit " + str((pagina - 1) * TAMANHO_PAGINA) + ", " + str(TAMANHO_PAGINA))
    resultado = cursor.fetchall()
    for registro in resultado:
        registro["likes"] = get_total_likes(registro["feed_id"])
        feeds.append(gerar_feed(registro))

    return jsonify(feeds)


@servico.route("/feeds_por_produto/<string:nome_produto>/<int:pagina>")
def get_feed_por_produto(nome_produto, pagina):
    feeds = []
    conexao = get_conexao_bd()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute(
        "select feeds.id as feed_id, DATE_FORMAT(feeds.data, '%Y-%m-%d T') as data," +
        "categoria.id as categoria_id, categoria.nome as nome_empresa, " +
        "produtos.nome as nome_produto, produtos.receita as receita, " +
        "produtos.passos as passos_receita ," +
        "produtos.imagem1, IFNULL(produtos.imagem2, '') as imagem2, IFNULL(produtos.imagem3, '') as imagem3 " +
        "from feeds, produtos, categoria " +
        "where produtos.id = feeds.produto " +
        "and categoria.id = produtos.categoria " +
        "and produtos.nome like '%" + nome_produto + "%' " +
        "order by data desc " +
        "limit " + str((pagina - 1) * TAMANHO_PAGINA) + ", " + str(TAMANHO_PAGINA))
    resultado = cursor.fetchall()
    for registro in resultado:
        registro["likes"] = get_total_likes(registro["feed_id"])
        feeds.append(gerar_feed(registro))

    return jsonify(feeds)


if __name__ == "__main__":
    servico.run(
        host='0.0.0.0',
        debug=DEBUG
    )

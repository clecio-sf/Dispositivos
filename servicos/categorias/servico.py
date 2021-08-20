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


@servico.route("/isalive")
def is_alive():
    return jsonify(alive=IS_ALIVE)


def gerar_categoria(registro):
    categoria = {
        "_id": registro["id"],
        "name": registro["nome"]
    }
    return categoria


@servico.route("/categoria")
def get_categorias():
    categorias = []
    conexao = get_conexao_bd()
    cursor = conexao.cursor(dictionary=True)
    cursor .execute("select id, nome from categoria")
    resultado = cursor.fetchall()

    for registro in resultado:
        categorias.append(gerar_categoria(registro))

    return jsonify(categorias)


if __name__ == "__main__":
    servico.run(
        host='0.0.0.0',
        debug=DEBUG
    )

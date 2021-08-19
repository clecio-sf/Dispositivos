from flask import Flask, jsonify
import mysql.connector as mysql

servico = Flask(__name__)

IS_ALIVE = 'yes'
DEBUG = True
TAMANHO_PAGINA = 8

MYSQL_SERVER = 'bancodados'
MYSQL_USER = 'root'
MYSQL_PASS = 'admin'
MYSQL_BANCO = 'receitas'


def get_conexao_bd():
    conexao = mysql.connect(
        host=MYSQL_SERVER, user=MYSQL_USER, password=MYSQL_PASS, database=MYSQL_BANCO
    )

    return conexao

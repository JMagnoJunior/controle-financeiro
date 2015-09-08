from flask_restful import fields

pessoa_json = {
    'id': fields.Integer,
    'nome': fields.String,
}

classificacao_do_tipo_json = {
    'id': fields.Integer,
    'descricao': fields.String,
}

tipo_do_gasto_json = {
    'id': fields.Integer,
    'descricao': fields.String,
    'classificacao': fields.Nested(classificacao_do_tipo_json)
}

gasto_json = {
    'id': fields.Integer,
    'valor': fields.Fixed(decimals=2),
    'motivo': fields.String,
    'data': fields.DateTime("iso8601"),
    'pessoa': fields.Nested(pessoa_json),
    'tipo': fields.Nested(tipo_do_gasto_json),
}


menu_json = {
    'nome': fields.String
}

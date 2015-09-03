# -*- coding: utf-8 -*-
from server import db


class Gasto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    valor = db.Column(db.Numeric(precision=2))
    __data = db.Column("data", db.Date, default=db.func.today())
    motivo = db.Column(db.Unicode)

    tipo_id = db.Column(db.Integer, db.ForeignKey('tipo_do_gasto.id'))
    tipo = db.relationship('TipoDoGasto', backref=db.backref('gastos',
                                                             lazy='dynamic'))

    pessoa_id = db.Column(db.Integer, db.ForeignKey('pessoa.id'))
    pessoa = db.relationship('Pessoa', backref=db.backref('gastos',
                                                          lazy='dynamic'))

    def __init__(self, valor, data, motivo, cod_tipo, cod_pessoa):
        self.valor = valor
        self.data = data
        self.motivo = motivo
        self.tipo_id = cod_tipo
        self.pessoa_id = cod_pessoa

    @property
    def data(self):
        return self.__data

    @data.setter
    def data(self, valor):
        import datetime
        dia = int(valor.split("/")[0])
        mes = int(valor.split("/")[1])
        ano = int(valor.split("/")[2])
        self.__data = datetime.date(ano, mes, dia)


class Pessoa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.Unicode)


class ClassificacaoDoTipo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.Unicode)


class TipoDoGasto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.Unicode)

    classificacao_id = db.Column(db.Integer,
                                 db.ForeignKey('classificacao_do_tipo.id'))
    classificacao = db.relationship('ClassificacaoDoTipo',
                                    backref=db.backref('tipos',
                                                       lazy='dynamic'))

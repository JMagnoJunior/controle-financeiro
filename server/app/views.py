# -*- coding: utf-8 -*-
from flask import g, request
from flask.ext import restful
from flask_restful import marshal_with, marshal

from app.server import api, db  # , flask_bcrypt, auth
from app.models import Gasto
from serialize import gasto_json, menu_json


class GastoListView(restful.Resource):

    @marshal_with(gasto_json)
    def post(self):
        valor, data = request.form["valor"], request.form["data"]
        motivo, cod_tipo = request.form["motivo"], request.form["tipo"]
        cod_pessoa = request.form["pessoa"]

        gasto = Gasto(valor, data, motivo, cod_tipo, cod_pessoa)

        db.session.add(gasto)
        db.session.commit()

        return marshal(gasto, gasto_json), 201

    @marshal_with(gasto_json)
    def get(self):
        lista_gastos = Gasto.query.all()
        return lista_gastos


class GastoView(restful.Resource):
    @marshal_with(gasto_json)
    def get(self, id):
        gasto = Gasto.query.filter_by(id=id).first()
        return gasto

    @marshal_with(gasto_json)
    def patch(self, id):
        gasto = Gasto.query.filter_by(id=id).first()
        for campo_editado in request.get_json():
            print campo_editado
            for key, val in campo_editado.items():
                setattr(gasto, key, val)
        db.session.commit()


class MenuList(restful.Resource):
    @marshal_with(menu_json)
    def get(self):

        return [{'nome': 'gastos'}, {'nome': 'relatorios'}]

api.add_resource(GastoListView, '/api/v1/gastos')
api.add_resource(GastoView, '/api/v1/gastos/<int:id>')

api.add_resource(MenuList, '/api/v1/menus')

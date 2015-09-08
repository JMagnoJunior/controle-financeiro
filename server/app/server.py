# -*- coding: utf-8 -*-
import os
from flask import Flask

from flask.ext.restful import Api
from flask.ext.bcrypt import Bcrypt
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.httpauth import HTTPBasicAuth

basedir = os.path.join(os.path.dirname(__file__), '../')

app = Flask(__name__)

app.config.from_object('app.config')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
                                        os.path.join(basedir, 'app.sqlite')

db = SQLAlchemy(app)

errors = {
    'Exception': {
        'message': "Erro Desconhecido",
        'status': 500,
    }

}

api = Api(app, errors=errors)
# flask_bcrypt = Bcrypt(app)
# auth = HTTPBasicAuth()


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


import views

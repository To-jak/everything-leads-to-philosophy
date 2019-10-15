from flask import Flask, request, make_response, jsonify
from flask_restplus import Api, Resource, fields
import json

from wiki_source import getFirstLink

flask_app = Flask(__name__)
app = Api(app = flask_app, 
		    version = "1.0", 
		    title = "First wikipedia article link", 
		    description = "Return the first referenced wiki article from a wikipedia page.")

name_space = app.namespace('First_wiki_link', description='Test APIs')

@name_space.route("/first_link&articleName=<string:articleName>")
class MainClass(Resource):

    def options(self):
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    @app.doc(responses={ 200: 'OK', 400: 'Invalid Argument', 500: 'Internal Error'},
            params={ 'articleName': 'Specify the wiki article name where the first link has to be found.'})

    def get(self, articleName):
        try:
            firstLink = getFirstLink(articleName)
            if(firstLink == None):
                response = jsonify({
                "statusCode": 200,
                "status": "Link not found",
				"nextArticleName" : ""
				})
            else:
                response = jsonify({
                    "statusCode": 200,
                    "status": "link retrieved",
                    "nextArticleName" : firstLink.get('title')
                    })
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

        except Exception as e:
            name_space.abort(400, e.__doc__, status = "Could not retrieve information", statusCode = "400")
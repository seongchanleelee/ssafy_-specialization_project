from flask import Flask, render_template, jsonify, request, make_response
from flask_restx import Api, Resource  # Api 구현을 위한 Api 객체 import
from flask_cors import CORS
from konlpy.tag import Okt
import json
import jpype

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app, resources={r'*': {'origins': ['http://localhost:3000','https://j7c202.p.ssafy.io']}})
api = Api(app, version='1.0', title='API 문서', description='Swagger 문서', doc="/api-docs")  # Flask 객체에 Api 객체 등록


flask_api = api.namespace('/flask', description='형태소 분리 API')

okt = Okt()

def encode(data):
    return make_response(json.dumps(data, ensure_ascii=False))


@flask_api.route("/morph")
class Morpheme(Resource):
    @api.doc(params={'text': {'description': '형태소 분리할 문장들', 'type': 'String'}})
    def get(self):
        ''' 텍스트 정규화를 거친 후 형태소로 분리해 반환한다. 중복은 제외한다. '''
        jpype.attachThreadToJVM()
        text = request.args.get('text')
        # morphs = okt.morphs(text)  # 형태소 추출
        # okt.sentences(text)  # 문장 분리
        text = okt.normalize(text)  # 정규화
        pos = okt.pos(text) # 형태소+품사태그 추출
        # nouns = okt.nouns(text) # 명사만 추출
        return encode(list(set(pos)))

    # def post(self):
    #     '''텍스트 정규화를 거친 후 형태소로 분리해 반환한다. 중복은 제외한다.  '''
    #     # text = request.get_json()['text'] # json으로 받을때
    #     text = request.form.get('text') # form으로 받을 때
    #     # text = text.encode("utf-8")
    #     text = okt.normalize(text)  # 정규화
    #     pos = okt.pos(text)  # 형태소+품사태그 추출
    #     # nouns = okt.nouns(text) # 명사만 추출
    #     return list(set(pos))


#if __name__ == "__main__":
#    app.run(debug=False, host='0.0.0.0', port=5000)

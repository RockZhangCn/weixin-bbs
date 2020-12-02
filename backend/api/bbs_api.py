
import time
import hashlib
import requests
from lxml import etree
import json
from flask import request
from utils.message import generate_response_msg
from flask import Flask, make_response
from dbend.db_connect import get_articles


wxspAppid = "wx9be9ddc0138fd230"

wxspSecret = "6c24cd48a4b6a108b36bab0ef23e83b5"

app = Flask(__name__)
app.debug = True


@app.route("/articles/<catagory>", methods=["GET"])
def list_catagory(catagory):
    if request.method == "GET":
        content = get_articles(catagory)
        return generate_response_msg(200, "OK", content)
    elif request.method == "POST":
        return "{}"


@app.route("/article/<int:id>", methods=["GET", "POST"])
def article(id):
    if request.method == "GET":
        print("Id is " + str(id))
        return "GET Response"
    elif request.method == "POST":
        data = request.get_data()

        json_re = json.loads(data.decode('utf-8'))
        title = json_re['title']
        content = json_re['content']
        user = json_re['user']
        catagory = json_re['catagory']

        return "POST Response"

@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_data()
        print("Received data", data.decode('utf-8'))
        json_re = json.loads(data.decode('utf-8'))
        temp_code = json_re['code']
        print("login received data", temp_code)

        grant_type = "authorization_code"
        result = requests.get(
            url="https://api.weixin.qq.com/sns/jscode2session",
            params={
                "grant_type": grant_type,
                "appid": wxspAppid,
                "secret": wxspSecret,
                "js_code":temp_code
            }
        ).json()

        print("Get content from weixin:", result)
        session_key = result.get("session_key")
        open_id = result.get("openid");
        print("We received session " + session_key + " open+_id " + open_id)
        return open_id;

    elif request.method == "GET":
        return "GET laod"

app.run(port=8080)

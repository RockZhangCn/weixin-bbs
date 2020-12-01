
import time
import hashlib
import requests
from lxml import etree
import json
from flask import request
from flask import Flask, make_response


wxspAppid = "wx9be9ddc0138fd230";

wxspSecret = "6c24cd48a4b6a108b36bab0ef23e83b5";

app = Flask(__name__)
app.debug = True



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
    
app.run(port=8082)

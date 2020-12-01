

import json


def generate_response_msg(code, desc, content):
    response_json = dict()
    response_json['code'] = code
    response_json['desc'] = desc
    response_json['content'] = content
    return json.dumps(response_json, indent=4)
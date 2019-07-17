import json
from urllib import request


class TestView:



    def test_login(self):
        basepath = 'http://localhost:8000/'
        url = basepath + 'users/login'
        f = {"username":"admin", "password": "admin@123"}
        json_obj = json.dumps(f)

        response = request.post(url, json_obj)

        assert response.status == 202


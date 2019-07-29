"""
    :author: Gaurav Nagoshe
    :since: 11/07/2019
    :overview:

"""

from django.contrib.auth.models import User
import requests
import pytest


# def test_login():
#     basepath = 'http://localhost:8000/users/login/'
#     data = {"username":"admin", "password": "admin@123"}
#
#     response = requests.post(url=basepath, data=data)
#
#     assert response.status_code == 202, 'Message for Successful Login'
#
#
# def test_forgot_password():
#     url = 'http://localhost:8000/users/forgot_password/'
#     data = {"email": "gaurav23091996@gmail.com"}
#     response = requests.post(url=url, data=data)
#
#     assert response.status_code == 200, 'Successfully sent Email for resetting password'


def test_notes_api():
    url = 'http://localhost:8000/users/notes/'
    response = requests.get(url=url)

    assert response.status_code == 200, 'no notes'


def test_labels_api():
    url = 'http://localhost:8000/users/labels/'
    response = requests.get(url=url)

    assert response.status_code == 200, 'no labels'


def test_trash_api():
    url = 'http://localhost:8000/users/trash/'
    response = requests.get(url=url)

    assert response.status_code == 200, 'no note in trash'


def test_archive_api():
    url = 'http://localhost:8000/users/archives/'
    response = requests.get(url=url)

    assert response.status_code == 200, 'no archives'








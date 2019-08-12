"""
    :author: Gaurav Nagoshe
    :since: 11/07/2019
    :overview:

"""

import requests
import json
import pytest
base_url = 'http://localhost:8000/notes/'
filename = 'notes.json'


def readfile():
    with open(filename, 'r') as json_file:
        data = json.load(json_file)
    return data


def test_notes_api():
    url = base_url+'list/'
    response = requests.get(url=url)

    assert response.status_code == 200, 'no notes'


def test_note_id_api():
    url = base_url + 'list/1/'
    response = requests.get(url=url)

    assert response.status_code == 200, 'no notes'


def test_labels_api():
    url = base_url + 'labels/'
    response = requests.get(url=url)

    assert response.status_code == 200, 'no labels'


def test_trash_api():
    url = base_url + 'trash/'
    response = requests.get(url=url)

    assert response.status_code == 200, 'no note in trash'


def test_archive_api():
    url = base_url + 'archives/'
    response = requests.get(url=url)

    assert response.status_code == 200, 'no archives'


def test_collaborator():
    url = base_url + 'collaborators/1/'
    data = readfile()
    email = data['email_data'][0]
    response = requests.post(url=url, data=email)
    assert response.status_code == 200, 'cannot collaborate'


def test_collaborator_negative():
    url = base_url + 'collaborators/1/'
    data = {
        "email": "adssds@asasda.com"
    }
    response = requests.post(url=url, data=data)
    assert response.status_code == 404, 'already collaborated with this email'


def test_collaborator_empty_email():
    url = base_url + 'collaborators/1/'
    data = {
        "email": ""
    }
    response = requests.post(url=url, data=data)
    assert response.status_code == 400, 'cannot collaborate'


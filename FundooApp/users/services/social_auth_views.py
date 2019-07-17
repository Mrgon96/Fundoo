from django.shortcuts import render
from ..serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.sites.shortcuts import get_current_site
import jwt
import json
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.http import HttpResponse

from dotenv import load_dotenv,find_dotenv
from pathlib import *
load_dotenv(find_dotenv())
env_path = Path('.')/'.env'
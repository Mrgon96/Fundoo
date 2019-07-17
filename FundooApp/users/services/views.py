'''
    :author:
    :since:
    :overview:

'''
import jwt
import json
from pathlib import *
from dotenv import load_dotenv,find_dotenv
from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.http import HttpResponse

from ..serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status

from Fundoo import settings
load_dotenv(find_dotenv())
env_path = Path('.')/'.env'

# Create your views here.


@permission_classes((AllowAny,))
class UserView(APIView):

    def post(self, request, format=None):

        try:

            serializer = UserSerializer(data=request.data)

            if serializer.is_valid():
                user = serializer.save()

                payload = {
                    "user_id": user.pk,
                    "username": user.username
                }

                token = jwt.encode(payload=payload, key="SECRET").decode('utf-8')

                current_site = get_current_site(request)

                subject = "Activate Your ChatApp Account"
                message = render_to_string('account_activate.html',
                                        {
                                            'user': user,
                                            'domain': current_site.domain,
                                            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                                            'token': token
                                        })
                from_email = 'hechosverse96@gmail.com'
                to_send = [user.email]

                send_mail(subject, message, from_email, to_send, fail_silently=False)

                return Response(serializer.data, status=status.HTTP_200_OK)

        except serializer.errors:
            return Response({'error': 'Enter Valid Data'}, status=status.HTTP_400_BAD_REQUEST)


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)

        if user:

            if not user.is_active:
                payload = {
                    "user_id": user.pk,
                    "username": user.username
                    }
                if payload == jwt.decode(token, "SECRET"):
                    user.is_active = True
                    user.save()
                    login(request, user)
                    # return redirect('home')

                response_data = {
                    "activate": "success"
                    }
                return HttpResponse(json.dumps(response_data), content_type="application/json")

            else:
                response_data = {
                    "activate": "false or already activated"
                }
                return HttpResponse(json.dumps(response_data), content_type="application/json")

    except User.DoesNotExist:
        response_data = {
            "activate": "false or already activated"
        }
        return HttpResponse(json.dumps(response_data), content_type="application/json")


@api_view(["POST"])
@permission_classes((AllowAny,))
def fogot_password(request):
    email = request.data.get("email")
    print(email)
    try:
        if email is None:
            raise ValueError

        user = User.objects.get(email=email)

        if user is None:
            return Response({'error': 'No User'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            payload = {
                "username": user.username
            }

            token = jwt.encode(payload=payload, key="SECRET").decode('utf-8')

            current_site = get_current_site(request)

            subject = "Activate Your ChatApp Account"
            message = render_to_string('password_reset.html',
                                       {
                                           'user': user,
                                           'domain': current_site.domain,
                                           'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                                           'token': token
                                       })
            from_email = settings.EMAIL_HOST_USER
            to_send = [user.email]

            send_mail(subject, message, from_email, to_send, fail_silently=False)

            return Response({'user': user.username}, status=status.HTTP_200_OK)

    except ValueError:
        return Response({'error': 'Enter an email'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def reset_password(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
        payload = jwt.decode(token, 'SECRET')

        if user:

            if request.method == 'POST':
                password = request.data.get("password")

                user.set_password(password)
                user.save()

                response_data = {
                    "password_reset": "Successful",
                    "payload": payload
                }
                return Response(response_data, status=status.HTTP_200_OK)

            else:
                response_data = {
                    "password_reset": "You are Here",
                    "payload": payload
                }
                return Response(response_data, status=status.HTTP_200_OK)

        else:
            raise ValueError

    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        response_data = {
            "password": "user not present"
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    try:
        if username is None or password is None:
            raise ValueError

        user = authenticate(username=username, password=password)
        token = jwt.encode({'uid': user.pk}, 'SECRET')

        if not user:
            return Response({'Error': 'No such User Exists'}, status=status.HTTP_404_NOT_FOUND)

    except ValueError:
        return Response({'error': 'provide username and password'}, status=status.HTTP_400_BAD_REQUEST)

    context = {
        'token': token,
        'username': user.username,
        'email': user.email
    }
    
    return Response(context, status=status.HTTP_202_ACCEPTED)






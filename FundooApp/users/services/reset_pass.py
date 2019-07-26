"""
    :author: Gaurav Nagoshe
    :since: 18/07/2019
    :overview:

"""

import jwt
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from .send_mail import SendMail


@api_view(["POST"])
@permission_classes((AllowAny,))
def fogot_password(request):
    """

    :param request: request type POST
    :return: returns json response with username

    """
    # getting email from user
    email = request.data.get("email")

    try:

        # condition for email value
        if email is None:
            raise ValueError

        # get user from email
        user = User.objects.get(email=email)

        # condition for none user
        if user is None:
            return Response({'error': 'No User'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            # payload for generating token
            payload = {
                "username": user.username
            }

            # token generation
            token = jwt.encode(payload=payload, key="SECRET").decode('utf-8')

            # type of function
            type = 'reset_password'

            # current site
            current_site = get_current_site(request)

            # make object of SendMail class and call sendmail function
            s = SendMail()
            s.sendmail(type=type, user=user, token=token, current_site=current_site)
            return Response({'user': user.username}, status=status.HTTP_200_OK)

    except ValueError:
        return Response({'error': 'Enter an email'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def reset_password(request, uidb64, token):
    """

    :param request: request type here is GET and POST
    :param uidb64:
    :param token:
    :return:
    """
    try:

        # get decoded uid from url
        uid = force_text(urlsafe_base64_decode(uidb64))

        # search user from uid
        user = User.objects.get(pk=uid)

        # get payload from token
        payload = jwt.decode(token, 'SECRET')

        if user:

            # if request method is POST
            if request.method == 'POST':

                # request for password
                password = request.data.get("password")

                # set neww password for user
                user.set_password(password)

                # save user
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

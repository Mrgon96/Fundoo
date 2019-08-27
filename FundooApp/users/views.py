"""
    :author: Gaurav Nagoshe
    :since: 08/07/2019
    :overview:

"""

import jwt
import json
from django.contrib.auth import authenticate
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.contrib.auth.models import User
from django.shortcuts import render
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.core.mail import send_mail
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .serializers import UserSerializer
from Fundoo import settings
from .decorators import user_login_required
from .services.Redis_Service import RedisCache
from django.views.decorators.csrf import csrf_exempt
from .services.s3_service import ImageUpload
from .models.profile_model import UserProfile
from .util import Util
from .serializers import UserProfilePic

fileUpload = ImageUpload()
# making object of redis service class
redis = RedisCache()
util = Util()

# simple function to render to home
@user_login_required
def home(request):
    """

    :param request: request to server
    :return: renders or redirects to home.html
    """
    return render(request, 'home.html')


# Function to Logout User
@user_login_required
def logout(request):
    """

    :param request: request to server
    :return: redirects to register.html
    """

    redis.flush()  # clearing redis cache when user logs out
    auth_logout(request)  # logout user

    return render(request, 'register.html')


@permission_classes((AllowAny,))
class UserView(APIView):

    """
    Class for UserView
    Class has different methods like post,put,get,delete
    Method post is for Registration of user

    """

    def post(self, request, format=None):

        """

        :param request: type of request to server here it is POST
        :param format: format of data to be passed to server. default is None
        :return: json response with status code for registration of user
        """
        try:
            data = request.data
            if data is None:
                return Response({'error': 'Enter Data'}, status=status.HTTP_400_BAD_REQUEST)

            # define a serializer object of UserSerializer and get data
            serializer = UserSerializer(data=data)
            username = data['username']

            if User.objects.filter(username=username).exists():
                return Response({'Error': 'User already Exists'}, status=status.HTTP_400_BAD_REQUEST)

            if serializer.is_valid():  # check for valid data in serializer

                user = serializer.save()  # make user object from serializer
                # payload to generate token
                payload = {
                    "user_id": user.pk,
                    "username": user.username
                }

                # generate jwt token
                token = jwt.encode(payload=payload, key=settings.JWT_SECRET_KEY).decode('utf-8')

                # get current site
                current_site = get_current_site(request)

                # subject for mail
                subject = "Activate Your ChatApp Account"

                # message to be sent in mail
                message = render_to_string('account_activate.html',
                                           {
                                               'user': user,
                                               'domain': current_site.domain,
                                               'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                                               'token': token
                                           })

                # sender and receiver mails
                from_email = settings.EMAIL_HOST_USER
                to_send = [user.email]

                # send mail method to send mail
                send_mail(subject, message, from_email, to_send, fail_silently=False)

                return Response(serializer.data, status=status.HTTP_200_OK)

        except ValueError:
            return Response({'data': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


def activate(request, uidb64, token):
    """

    :param request: type of request to the server
    :param uidb64: encoded uid of user from link of url
    :param token: token generated for user
    :return: this functions activates user if user is not active

    """
    try:
        # decode uid from link and get user
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)

        if user:  # check for user in database

            if not user.is_active:  # checking user is active or not

                # defining payload for user
                payload = {
                    "user_id": user.pk,
                    "username": user.username
                    }

                # checking if payload equals decoded token from link
                if payload == jwt.decode(token, settings.JWT_SECRET_KEY):

                    # make user active
                    user.is_active = True

                    # save and login user
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

    except user.DoesNotExists:
        response_data = {
            "activate": "false or already activated"
        }
        return HttpResponse(json.dumps(response_data), content_type="application/json")


@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    """

    :param request: request type. here, it is POST as in decorator @api_view
    :return: returns a json response with username , email and generated jwt token

    """
    # get username and password
    username = request.data.get("username")
    password = request.data.get("password")
    try:
        # check for username and password
        if username is None or password is None:

            raise ValueError

        # authenticate user
        user = authenticate(username=username, password=password)

        # if user is not present
        if not user:

            return Response({'Error': 'No such User Exists'}, status=status.HTTP_404_NOT_FOUND)

        payload = {
            "user_id": user.pk,
            "usermname": user.username
        }
        # token generated by using jwt
        token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm='HS256').decode('utf-8')
        print(user.is_authenticated)
        # setting token in Redis Cache
        redis.set('token', token)

        # login the user
        # auth_login(request, user)

    except ValueError:

        return Response({'error': 'provide username and password'},
                        status=status.HTTP_400_BAD_REQUEST)

    context = {
        'token': token,
        'username': user.username,
        'email': user.email,
        'id':user.pk
    }

    return Response(context, status=status.HTTP_202_ACCEPTED)


@csrf_exempt
def upload(request):
    if request.method == 'POST':

        # get file as input from user
        imagename = request.FILES.get('image')
        userdata = util.GetUser()
        print(userdata)
        uid = userdata['user_id']
        username1 = userdata['usermname']
        user = request.user
        x = fileUpload.file_upload(imagename, uid)
        profile_model = UserProfile.objects.get(user=uid)
        profile_model.profile_pic = x
        profile_model.save()

        if x:
            return HttpResponse('Success')

    return HttpResponse('Where is Image...')


@api_view(['GET'])
@csrf_exempt
@permission_classes((AllowAny,))
def ProfilePic(request):
    userdata = util.GetUser()
    uid=userdata['user_id']
    profile_model = UserProfile.objects.get(user=uid)
    pic_ser = UserProfilePic(profile_model)
    return Response(pic_ser.data, status=status.HTTP_200_OK)



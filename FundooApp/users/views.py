"""
    :author: Gaurav Nagoshe
    :since: 08/07/2019
    :overview:

"""

import jwt
import json
import pickle
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
from .serializers import NoteSerializer, LabelSerializer, UserProfilePic
from .models.notes import Notes, Label
from .models.profile_model import UserProfile
from .util import Util

fileUpload = ImageUpload()
# making object of redis service class
r = RedisCache()
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
def logout(request):
    """

    :param request: request to server
    :return: redirects to register.html
    """

    r.flush()  # clearing redis cache when user logs out
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

            # define a serializer object of UserSerializer and get data
            serializer = UserSerializer(data=request.data)

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

        except UserSerializer.errors:   # check for errors
            return Response({'error': 'Enter Valid Data'}, status=status.HTTP_400_BAD_REQUEST)


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
            "user_id":user.pk,
            "usermname":user.username
        }
        # token generated by using jwt
        token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm='HS256').decode('utf-8')

        # setting token in Redis Cache
        r.set('token', token)

        # login the user
        auth_login(request, user)

    except ValueError:

        return Response({'error': 'provide username and password'},
                        status=status.HTTP_400_BAD_REQUEST)

    context = {
        'token': token,
        'username': user.username,
        'email': user.email
    }

    return Response(context, status=status.HTTP_202_ACCEPTED)


@csrf_exempt
def upload(request):
    if request.method == 'POST':

        # get file as input from user
        imagename = request.FILES.get('image')
        userdata = util.GetUser()
        uid = userdata['user_id']

        x = fileUpload.file_upload(imagename, uid)

        profile = UserProfile(profile_pic=x, user_id=uid)
        profile.save()
        if x:
            return HttpResponse('Success')

    return HttpResponse('Where is Image...')


@permission_classes([AllowAny])
class NotesList(APIView):
    """
    This class has two methods get and post
    get methods gives in response a list of all notes
    and post method will create a node with list in response
    """

    def get(self, request, format=None):
        try:
            # get all objects in notes
            notes = Notes.objects.all()

            if notes:

                # serialize data
                note_serializer = NoteSerializer(notes, many=True)

                # create pickle object
                pickle_object = pickle.dumps(note_serializer.data)

                # set in redis cache
                r.set("notes", pickle_object)

                return Response(note_serializer.data, status=status.HTTP_200_OK)

        except Notes.DoesNotExist:
            return Response({"data": "no notes"}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        # get valid data for serializer
        serializer = NoteSerializer(data=request.data)

        # check for valid serializer and save it
        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({"error": "enter valid data"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def trash(request):
    try:
        # get note objects with trash equal to true
        trashed = Notes.objects.filter(is_trashed=True)

        # get notes
        notes = NoteSerializer(trashed, many=True)

        if notes:

            return Response(notes.data, status=status.HTTP_200_OK)

        else:
            raise ValueError

    except ValueError:
        return Response({"error": "nothing in trash"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def reminders(request):
    try:
        # get notes with reminder
        reminder = Notes.objects.filter(reminder__isnull=False)

        # get serialize data
        notes = NoteSerializer(reminder, many=True)

        if reminder and notes:
            return Response(notes.data, status=status.HTTP_200_OK)
        else:
            raise ValueError

    except ValueError:
        return Response({"data": "No Reminders"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])
def archives(request):
    try:
        # get archived notes
        archive = Notes.objects.filter(is_archived=True)

        notes = NoteSerializer(archive, many=True)

        if archives and notes:
            return Response(notes.data, status=status.HTTP_200_OK)

        else:
            raise ValueError
    except ValueError:
        return Response({"data": "nothing archived"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def label_notes(request):
    try:
        # get labels with primary key
        label = Label.objects.get(pk=1)

        # return notes containing label above
        label_data = label.notes_set.all()

        # serialize obtained data
        serializer = NoteSerializer(label_data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except ValueError:
        return Response({"data": "no such label"})


@permission_classes([AllowAny])
class LabelList(APIView):
    """
    This class,
    for get request returns labels list,
    and for post request creates a label
    """
    def get(self, request):
        try:
            # get all labels
            label = Label.objects.all()

            # serialize obtained data
            labels = LabelSerializer(label, many=True)

            return Response(labels.data, status=status.HTTP_200_OK)

        except ValueError:
            return Response({"data": "no labels"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            # request for serialize data
            serializer = LabelSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()

                # get all labels and serialize data
                label = Label.objects.all()
                labels = LabelSerializer(label, many=True)

                return Response(labels.data, status=status.HTTP_200_OK)

        except ValueError:
            return Response({"error": "occured"}, status=status.HTTP_200_OK)


class NoteDetails(APIView):
    """
    This Class is used to create an api
    to Get, Update, Delete a Note from its Primary Key

    """
    def get(self, request, pk):
        try:
            # get a note from primary key
            note = Notes.objects.get(pk=pk)

            # serialize data
            serializer = NoteSerializer(note)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Notes.DoesNotExist:
            return Response({"data": "no such note found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            # get a note from primary key
            note = Notes.objects.get(pk=pk)

            # request for serialize data which can have partial key-value pairs
            serializer = NoteSerializer(instance=note, data=request.data, partial=True)

            if serializer.is_valid(raise_exception=True):
                # save serializer
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

        except ValueError:
            return Response({"data": "no such note found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            # get a note from primary key
            note = Notes.objects.get(pk=pk)

            # delete note
            note.delete()
            return Response({"deleted": "yes"}, status=status.HTTP_200_OK)
        except ValueError:
            return Response({"data": "no such note found"}, status=status.HTTP_404_NOT_FOUND)

class LabelDetails(APIView):
    """
    This class is used to create an api
    to Get, Update, Delete a Label obtained from its Primary Key
    """
    def get(self, request, pk):
        try:
            # get a label from primary key
            label = Label.objects.get(pk=pk)

            # serialize data
            labeldetail = LabelSerializer(label)

            if label:
                return Response(labeldetail.data, status=status.HTTP_200_OK)

        except Label.DoesNotExist:
            return Response({"data": "no such label found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            # get a label from primary key
            label = Label.objects.get(pk=pk)

            # request for serialize data which can have partial key value pairs
            labeldetail = LabelSerializer(instance=label, data=request.data, partial=True)

            if labeldetail.is_valid(raise_exception=True):
                # save serializer

                labeldetail.save()

                return Response(labeldetail.data, status=status.HTTP_200_OK)

        except ValueError:
            return Response({"data": "Enter Proper Data"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            # get a label from primary key
            label = Label.objects.get(pk=pk)

            if label:
                # delete Label
                label.delete()
                return Response({"deleted": "yes"}, status=status.HTTP_200_OK)

        except ValueError:
            return Response({"data": "no such label"}, status=status.HTTP_200_OK)

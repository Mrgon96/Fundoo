"""
    :author: Gaurav Nagoshe
    :since: 31/07/2019
    :overview:

"""
import pickle
# from django_elasticsearch_dsl_drf.constants import (
#     LOOKUP_FILTER_RANGE,
#     LOOKUP_QUERY_IN,
#     LOOKUP_QUERY_GT,
#     LOOKUP_QUERY_GTE,
#     LOOKUP_QUERY_LT,
#     LOOKUP_QUERY_LTE
# )
# from django_elasticsearch_dsl_drf.filter_backends import (
#     FilteringFilterBackend,
#     OrderingFilterBackend,
#     DefaultOrderingFilterBackend,
#     SearchFilterBackend
# )
# from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from users.services.Redis_Service import RedisCache
from users.services.s3_service import ImageUpload
from .serializers import NoteSerializer, LabelSerializer
from .models.notes import NoteInfo, Labels
from .documents import NoteDocument
from users.util import Util
from django.shortcuts import render

fileUpload = ImageUpload()
# making object of redis service class
redis = RedisCache()
util = Util()
@permission_classes([AllowAny])
class NoteInfoList(APIView):
    """
    This class has two methods get and post
    get methods gives in response a list of all notes
    and post method will create a node with list in response
    """

    def get(self, request, format=None):

        res = {
            "data": []
        }
        try:
            # get all objects in notes
            userdata = util.GetUser()
            uid=userdata['user_id']
            print(uid,"User ID HERE")
            notes = NoteInfo.objects.filter(user=uid, is_archive=False, is_trash=False).order_by('-created_at')

            note_serializer = NoteSerializer(notes, many=True)

            if notes:
                # create pickle object
                pickle_object = pickle.dumps(note_serializer.data)

                # set in redis cache
                redis.set("notes", pickle_object)
                res['data'] = note_serializer.data
                return Response(res, status=status.HTTP_200_OK)

        except NoteSerializer.errors:
            return Response({"error": "no notes"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"error": "no notes"}, status=status.HTTP_404_NOT_FOUND)

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
        trashed = NoteInfo.objects.filter(is_trash=True)
        # get notes
        notes = NoteSerializer(trashed, many=True)

        if notes:
            return Response({'data':notes.data}, status=status.HTTP_200_OK)

        else:
            raise ValueError

    except ValueError:
        return Response({"error": "nothing in trash"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def reminders(request):
    try:
        # get all objects in notes
        userdata = util.GetUser()
        uid = userdata['user_id']
        # get notes with reminder
        reminder = NoteInfo.objects.filter(user=uid, reminder__isnull=False)
        # get serialize data
        notes = NoteSerializer(reminder, many=True)

        if reminder and notes:
            return Response({'data':notes.data}, status=status.HTTP_200_OK)
        else:
            raise ValueError

    except ValueError:
        return Response({"data": "No Reminders"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])
def archives(request):
    try:
        # get all objects in notes
        userdata = util.GetUser()
        uid = userdata['user_id']
        # get archived notes
        archive = NoteInfo.objects.filter(user=uid, is_archive=True)

        notes = NoteSerializer(archive, many=True)

        if archives and notes:
            return Response({'data':notes.data}, status=status.HTTP_200_OK)

        else:
            raise ValueError
    except ValueError:
        return Response({"data": "nothing archived"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])
def label_notes(request, label_name):
    try:
        # get all objects in notes
        userdata = util.GetUser()
        uid = userdata['user_id']
        # get labels with primary key
        label = Labels.objects.get(user=uid, name=label_name)
        # return notes containing label above
        label_data = label.noteinfo_set.all()
        # serialize obtained data
        serializer = NoteSerializer(label_data, many=True)

        return Response({'data':serializer.data}, status=status.HTTP_200_OK)

    except ValueError:
        return Response({"data": "no such label"})


@permission_classes([AllowAny])
class LabelsList(APIView):
    """
    This class,
    for get request returns labels list,
    and for post request creates a label
    """
    def get(self, request):
        try:
            # get all labels
            label = Labels.objects.all()
            # serialize obtained data
            labels = LabelSerializer(label, many=True)

            return Response(labels.data, status=status.HTTP_200_OK)

        except Labels.DoesNotExist:
            return Response({"data": "no labels"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            # request for serialize data
            serializer = LabelSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                # get all labels and serialize data
                label = Labels.objects.all()
                labels = LabelSerializer(label, many=True)

                return Response(labels.data, status=status.HTTP_200_OK)
            else:
                raise ValueError

        except ValueError:
            return Response({"error": "occured"}, status=status.HTTP_200_OK)


@permission_classes([AllowAny])
class NoteDetails(APIView):
    """
    This Class is used to create an api
    to Get, Update, Delete a Note from its Primary Key

    """
    def get(self, request, pk):
        try:
            # get a note from primary key
            note = NoteInfo.objects.get(pk=pk)
            # serialize data
            serializer = NoteSerializer(note)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except NoteInfo.DoesNotExist:
            return Response({"data": "no such note found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            # get a note from primary key
            note = NoteInfo.objects.get(pk=pk)
            # request for serialize data which can have partial key-value pairs
            serializer = NoteSerializer(instance=note, data=request.data, partial=True)

            if serializer.is_valid(raise_exception=True):
                # save serializer
                serializer.save()
                return Response({'data':serializer.data}, status=status.HTTP_200_OK)

        except ValueError:
            return Response({"data": "no such note found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            # get a note from primary key
            note = NoteInfo.objects.get(pk=pk)
            # delete note
            note.delete()
            return Response({"deleted": "yes"}, status=status.HTTP_200_OK)
        except ValueError:
            return Response({"data": "no such note found"}, status=status.HTTP_404_NOT_FOUND)


@permission_classes([AllowAny])
class LabelsDetails(APIView):
    """
    This class is used to create an api
    to Get, Update, Delete a Labels obtained from its Primary Key
    """
    def get(self, request, pk):
        try:
            # get a label from primary key
            label = Labels.objects.get(pk=pk)
            # serialize data
            labeldetail = LabelSerializer(label)

            if label:
                return Response(labeldetail.data, status=status.HTTP_200_OK)

        except Labels.DoesNotExist:
            return Response({"data": "no such label found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            # get a label from primary key
            label = Labels.objects.get(pk=pk)
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
            label = Labels.objects.get(pk=pk)

            if label:
                # delete Labels
                label.delete()
                return Response({"deleted": "yes"}, status=status.HTTP_200_OK)

        except ValueError:
            return Response({"data": "no such label"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def search(request):

    # empty list
    data = []
    #request data
    s = request.data.get('search')
    if s:
        # note search query
        notes = NoteDocument.search().query("match", title=s)
        # making dictionary of notes obtained
        note_data = {'data': notes}
        # notes in json data
        for i in note_data['data']:

            data1 = {}
            data1['id'] = i.id
            data1['title'] = i.title
            data1['content'] = i.content

            # append data in note to data
            data.append(data1)
        print(data)

    else:
        data = {
            'data': ' no data'
        }

    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def create_collaborator(request, note_id):
    """

    :param request: for api request type
    :param note_id: for getting particular node
    :return:
    """
    response = {}
    try:

        # request for email data
        email = request.data.get('email')
        # get note from note id
        note = NoteInfo.objects.get(pk=note_id)

        if request.method == 'GET':  # if request type is get
            if note:  # if note exists
                # create note serializer
                note_ser = NoteSerializer(note)
                response['data'] = []
                response['data'].append(note_ser.data)
                response['message'] = 'note with id ' + str(note_id)
                response['status'] = 200

        if request.method == 'POST':    # if request type is post
            if email:  # if email is not empty
                # get user from email
                user = User.objects.get(email=email)
                if user:  # if user exists
                    if user in note.collaborator.all():
                        response['data'] = ''
                        response['message'] = 'user already collaborated'
                        response['status'] = 400

                    note.collaborator.add(user.pk)  # add collaborator as user pk
                    response['data'] = ''
                    response['message'] = 'collaborator added successfully'
                    response['status'] = 200

            else:
                raise ValueError

    except ValueError:
        response['data'] = ''
        response['message'] = 'email is empty'
        response['status'] = 404

    except User.DoesNotExist:
        response['data'] = ''
        response['message'] = 'user does not exists'
        response['status'] = 404

    except NoteInfo.DoesNotExist:
        response['data'] = ''
        response['message'] = 'note does not exists'
        response['status'] = 404

    return Response(response, status=response['status'])











# class NoteViewSet(DocumentViewSet):
#     document = NoteDocument
#     serializer_class = NoteDocumentSerializer
#
#     lookup_field = 'id'
#     filter_backends = [
#         FilteringFilterBackend,
#         OrderingFilterBackend,
#         DefaultOrderingFilterBackend,
#         SearchFilterBackend
#     ]
#
#     search_fields = (
#         'title',
#         'content'
#     )
#
#     filter_fields = {
#         'id': {
#             'field': 'id',
#             'lookups': [
#                 LOOKUP_FILTER_RANGE,
#                 LOOKUP_QUERY_IN,
#                 LOOKUP_QUERY_GT,
#                 LOOKUP_QUERY_GTE,
#                 LOOKUP_QUERY_LT,
#                 LOOKUP_QUERY_LTE
#             ],
#         },
#         'title': 'title.raw',
#         'content': 'content.raw'
#     }
#
#     ordering_fields={
#         'id': 'id',
#         'title': 'title.raw',
#     }
#
#     ordering = ('id',)

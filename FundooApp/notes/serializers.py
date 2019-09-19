"""
    :author: Gaurav Nagoshe
    :since: 31/07/2019
    :overview:

"""

from rest_framework import serializers
from .models.notes import NoteInfo, Labels
from django.contrib.auth.models import User
# from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
# from .documents import NoteDocument


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labels
        fields = '__all__'

    def create(self, validated_data):
        return Labels.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class NoteSerializer(serializers.ModelSerializer):
    """
    This Class defines Serializer for Notes Models
    and in class Meta fields to be used in Serializer

    """
    # labels = LabelSerializer(many=True)
    # user = serializers.PrimaryKeyRelatedField()

    class Meta:
        model = NoteInfo
        fields = '__all__'
        # fields = [
        #     'title',
        #     'content',
        #     'image',
        #     'url',
        #     'reminder',
        #     'is_trashed',
        #     'is_archived',
        #     'collaborator',
        #     'labels',
        #     'color',
        #     ('user','')
        # ]
        # depth = 1
        # read_only_fileds = ('user',)


        def create(self, validated_data):
            # labels = validated_data.pop('labels')
            # if type(validated_data) == list:
            #     notes = []
            #     for data in validated_data:
            #         try:
            #             note = NoteInfo.objects.create(**data)
            #             notes.append(note)
            #         except Exception :
            #             pass
            #
            #         return notes
            # else:
            note = NoteInfo.objects.create(**validated_data)
            # for label in labels:
            #     Labels.objects.create(**label)
            return note
            # return NoteInfo.objects.create(**validated_data)
            # labels_data = validated_data.pop('labels')
            # note = NoteInfo.objects.create(**validated_data)
            # for label_data in labels_data:
            #     Labels.object.create(note=note, **label_data)
            # return note

        def update(self, instance, validated_data):
            instance.title = validated_data.get('title', instance.title)
            instance.content = validated_data.get('content', instance.content)
            instance.image = validated_data.get('image', instance.image)
            instance.url = validated_data.get('url', instance.url)
            instance.reminder = validated_data.get('reminder', instance.reminder)
            instance.is_trashed = validated_data.get('is_trashed', instance.is_trashed)
            instance.is_archived = validated_data.get('is_archived', instance.is_archived)
            instance.collaborator = validated_data.get('collaborator', instance.collaborator)
            instance.labels = validated_data.get('labels', instance.labels)
            instance.color = validated_data.get('color', instance.color)
            instance.user = validated_data.get('user', instance.user)

            instance.save()
            return instance

#
# class NoteDocumentSerializer(DocumentSerializer):
#     class Meta:
#         document = NoteDocument
#         fields = (
#             'id',
#             'title',
#             'content'
#         )

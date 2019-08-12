"""
    :author: Gaurav Nagoshe
    :since: 31/07/2019
    :overview:

"""

from rest_framework import serializers
from .models.notes import NoteInfo, Labels
# from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
# from .documents import NoteDocument


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labels
        fields = [
            'name',
            'user'
        ]

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
    labels = LabelSerializer(many=True)

    class Meta:
        model = NoteInfo
        fields = [
            'title',
            'content',
            'image',
            'url',
            'reminder',
            'is_trashed',
            'is_archived',
            'collaborator',
            'labels',
            'color',
            'user'
        ]

        def create(self, validated_data):
            return NoteInfo.objects.create(**validated_data)

        def update(self, instance, validated_data):
            instance.title = validated_data.get('title', instance.title)
            instance.content = validated_data.get('content', instance.content)
            instance.image = validated_data.get('image', instance.image)
            instance.url = validated_data.get('url', instance.url)
            instance.reminder = validated_data.get('url', instance.url)
            instance.is_trashed = validated_data.get('is_trashed', instance.is_trashed)
            instance.is_archived = validated_data.get('is_archived', instance.is_archived)
            instance.collaborator = validated_data.get('collaborator', instance.collaborator)
            instance.labels = validated_data.get('labels', instance.labels)
            instance.color = validated_data.get('label', instance.labels)
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

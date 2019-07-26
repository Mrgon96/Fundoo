"""
    :author: Gaurav Nagoshe
    :since: 08/07/2019
    :overview:

"""

from django.contrib.auth.models import User
from rest_framework import serializers
from .models.notes import Notes, Label


# define class for User Serializer
class UserSerializer(serializers.ModelSerializer):

    """
    This class defines a serializer for user
    and creates instance of user and saves user
    """

    # serializer fields
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)

    # method to get validated data and create user
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        # check for password
        if password is not None:
            instance.set_password(password)

        # save and return instance
        instance.save()
        return instance

    class Meta:
        """
        This class uses a Model and fields in that model
        to be used in serializer
        """

        model = User
        fields = [
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'is_active'
        ]


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = [
            'name',
            'user'
        ]

    def create(self, validated_data):
        return Label.objects.create(**validated_data)

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
        model = Notes
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
            return Notes.objects.create(**validated_data)

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


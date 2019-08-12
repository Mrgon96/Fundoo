"""
    :author: Gaurav Nagoshe
    :since: 08/07/2019
    :overview:

"""

from django.contrib.auth.models import User
from rest_framework import serializers

from .models.profile_model import UserProfile


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


class UserProfilePic(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = '__all__'





from .services.Redis_Service import RedisCache
import jwt
from Fundoo import settings
from django.contrib.auth.models import User
from django.http import HttpResponse


def user_login_required(function):

    def wrapper(*args, **kwargs):
        try:

            r = RedisCache()
            token = r.get('token')
            token = token
            data = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms='HS256')
            userid = data['user_id']
            user = User.objects.get(pk=userid)

            if user:
                return function(*args, **kwargs)

        except User.DoesNotExist:
            return HttpResponse('You are not Current User')

    return wrapper

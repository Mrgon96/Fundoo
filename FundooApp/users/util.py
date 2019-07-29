from .services.Redis_Service import RedisCache
import jwt
from Fundoo import settings

r = RedisCache()

class Util:

    def GetUser(self):
        token = r.get('token')
        userdata = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms='HS256')

        return userdata


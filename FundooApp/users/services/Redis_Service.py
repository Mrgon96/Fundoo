"""
    :author: Gaurav Nagoshe
    :since: 17/07/2019
    :overview:

"""

import redis
from Fundoo import settings

# setting up redis server cache
r = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=settings.REDIS_DB)


# class for redis Server
class RedisCache:

    def set(self, key, value):
        """

        :param key: to be set in redis
        :param value: value for key in redis
        :return:
        """
        r.set(key, value)

    def get(self, key):
        """
        :param key: key in redis cache server
        :return: value for respective key
        """
        value = r.get(key)
        return value

    def flush(self):
        """

        :return: Flush all keys in Redis Server Cache
        """
        r.flushall()

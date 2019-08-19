from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    profile_pic = models.URLField(max_length=1000, blank=True, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

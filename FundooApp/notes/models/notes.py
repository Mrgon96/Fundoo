from django.db import models
from django.contrib.auth.models import User


class Labels(models.Model):
    name = models.CharField(max_length=50, blank=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class NoteInfo(models.Model):
    title = models.CharField(max_length=10000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=10000, blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    reminder = models.DateTimeField(blank=True, null=True)
    is_trashed = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    is_pinned = models.BooleanField(default=False)
    color = models.CharField(max_length=100, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    labels = models.ManyToManyField(Labels, blank=True)
    collaborator = models.ManyToManyField(User, related_name='user_collaborator', blank=True)







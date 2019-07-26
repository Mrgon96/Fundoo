from django.db import models
from django.contrib.auth.models import User


class Label(models.Model):
    name = models.CharField(max_length=50, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Notes(models.Model):

    title = models.CharField(max_length=10000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=10000, blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    reminder = models.DateTimeField(blank=True, null=True)
    is_trashed = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    is_pinned = models.BooleanField(default=False)
    collaborator = models.CharField(max_length=1000, blank=True, null=True)
    labels = models.ManyToManyField(Label)
    color = models.CharField(max_length=100, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)




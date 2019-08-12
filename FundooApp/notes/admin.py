from django.contrib import admin
from .models.notes import Labels,NoteInfo
# Register your models here.
admin.site.register(NoteInfo)
admin.site.register(Labels)

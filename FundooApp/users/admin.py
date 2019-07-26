from django.contrib import admin
from .models.notes import Notes, Label
# Register your models here.

admin.site.register(Notes)
admin.site.register(Label)
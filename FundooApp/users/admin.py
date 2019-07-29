from django.contrib import admin
from .models.notes import Notes, Label
from .models.profile_model import UserProfile
# Register your models here.

admin.site.register(Notes)
admin.site.register(Label)
admin.site.register(UserProfile)
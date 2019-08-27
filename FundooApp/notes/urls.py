from . import views as note_views
from django.conf.urls import url
from django.urls import path
# from rest_framework.routers import SimpleRouter

app_name = 'notes'

# router = SimpleRouter()
# router.register(
#     prefix='search',
#     base_name='notes_search',
#     viewset=note_views.NoteViewSet
# )

urlpatterns = [
    url(r'^list/$', note_views.NoteInfoList.as_view(), name='notes'),
    path('list/<int:pk>/', note_views.NoteDetails.as_view(), name='note_detail'),
    url(r'^trash/$', note_views.trash, name='trash'),
    url(r'^reminders/$', note_views.reminders, name='reminders'),
    url(r'^archives/$', note_views.archives, name='archives'),
    path('labeldata/<label_name>/', note_views.label_notes, name='labeldata'),
    url(r'^labels/$', note_views.LabelsList.as_view(), name="labels"),
    path('labels/<int:pk>/', note_views.LabelsDetails.as_view(), name="label_detail"),
    path('search/', note_views.search, name='search'),
    path('collaborators/<int:note_id>/', note_views.create_collaborator, name="collaborators"),
]
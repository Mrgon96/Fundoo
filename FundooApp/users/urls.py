from . import views as user_views
from django.conf.urls import url
from django.urls import path
from .services import swagger_views
from .services import reset_pass

from django.views.generic import TemplateView
app_name = 'users'

urlpatterns = [
    path('register/', user_views.UserView.as_view()),
    path('login/', user_views.login),
    path('activate/<uidb64>/<token>',
         user_views.activate, name='activate'),
    path('forgot_password/', reset_pass.fogot_password, name='forgot_password'),
    path('reset_password/<uidb64>/<token>', reset_pass.reset_password, name='reset_password'),
    url(r'^s/$', swagger_views.schema_view),

    url(r'^home/$', user_views.home, name='home'),

    url(r'^reg/$', TemplateView.as_view(template_name="register.html"), name='register'),
    url(r'^logout/$', user_views.logout, name='logout'),
    url(r'^upload/$',user_views.upload, name='upload'),
    # url(r'^notes/$', user_views.note_api, name='notes'),

]


from .services import views as user_views
from django.conf.urls import url
from django.urls import path
from .services import swagger_views
app_name = 'users'

urlpatterns = [
    path('register/', user_views.UserView.as_view()),
    path('login/', user_views.login),
    path('activate/<uidb64>/<token>',
         user_views.activate, name='activate'),
    path('forgot_password/', user_views.fogot_password, name='forgot_password'),
    path('reset_password/<uidb64>/<token>', user_views.reset_password, name='reset_password'),
    url(r'^$', swagger_views.schema_view)
]


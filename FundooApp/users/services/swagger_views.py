"""
    :author: Gaurav Nagoshe
    :since: 17/07/2019
    :overview:

"""

from rest_framework_swagger.views import get_swagger_view

# swagger dashboard
schema_view = get_swagger_view(title='Pastebin API')

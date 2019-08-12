# from elasticsearch_dsl.connections import connections
# from elasticsearch_dsl import DocType, Text
# from elasticsearch.helpers import bulk
# from elasticsearch import Elasticsearch
# from .models import notes
#
# connections.create_connection()
#
#
# class NoteIndex(DocType):
#     title = Text()
#     content = Text()
#
#     class Meta:
#         index = 'note-index'
#
#
# def bulk_indexing():
#     NoteIndex.init()
#     es = Elasticsearch()
#     bulk(client=es, actions=(b.indexing for b in notes.Notes.objects.all().iterator()))

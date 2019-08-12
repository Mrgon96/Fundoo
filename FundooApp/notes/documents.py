# from elasticsearch_dsl import analyzer
from django_elasticsearch_dsl.documents import DocType
# from django_elasticsearch_dsl import fields
from django_elasticsearch_dsl import Index

from .models.notes import NoteInfo

# define index
notes = Index('notes')


@notes.doc_type
class NoteDocument(DocType):
    """
    This method defines a document for note search
    and models and fields given to that document
    """
    # class Index:
    #     name = 'notes'
    #     settings = {
    #         'number_of_shards': 1,
    #         'number_of_replicas': 0
    #     }

    class Django:
        model = NoteInfo
        fields = [
            'id',
            'title',
            'content'
        ]






#
# notes_index = Index('notes')
# notes_index.settings(
#     number_of_shards=1,
#     number_of_replicas=0
# )
#
# html_strip = analyzer(
#     'html_strip',
#     tokenizer="standard",
#     filter=["standard", "lowercase", "stop", "snowball"],
#     char_filter=["html_strip"]
# )
#
#
# @notes_index.doc_type
# class NoteDocument(DocType):
#
#     id = fields.IntegerField(attr='id')
#     title = fields.StringField(
#         analyzer='html_strip',
#         fields={
#             'raw': fields.StringField(analyzer='keyword'),
#         }
#     )
#     content = fields.StringField(
#         analyzer='html_strip',
#         fields={
#             'raw': fields.StringField(analyzer='keyword'),
#         }
#     )
#
#     class Django:
#         model = Notes

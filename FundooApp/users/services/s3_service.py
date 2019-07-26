"""
    :author: Gaurav Nagoshe
    :since: 17/07/2019
    :overview:

"""

import boto3


class ImageUpload:

    def file_upload(self, image, uid):
        # username = 'admin'
        # define boto client
        s3 = boto3.client('s3')

        # convert uid to string
        u = str(uid)

        # upload file to bucket
        s3.upload_fileobj(image, 'fundoo96', u)
        return True

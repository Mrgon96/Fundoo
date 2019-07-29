"""
    :author: Gaurav Nagoshe
    :since: 17/07/2019
    :overview:

"""

import boto3


class ImageUpload:

    def file_upload(self, image, uid):

        # define boto client
        s3 = boto3.client('s3')

        # convert uid to string
        u = str(uid)

        img = str(image)
        img = img.split('.')

        extension = img[1]

        filename = u+'.'+extension

        # upload file to bucket
        s3.upload_fileobj(Fileobj=image, Bucket='fundoo96', Key=filename, ExtraArgs={'ACL': 'public-read'})

        fileurl = 'https://fundoo96.s3.ap-south-1.amazonaws.com/'+filename

        return fileurl



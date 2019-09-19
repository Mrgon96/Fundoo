import pika
import json
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from django.core.mail import send_mail
from urlshortening.models import get_short_url, invalidate_url, get_full_url
from Fundoo import settings
from django.shortcuts import render
from urllib import request

class RabbitMqService:
    def __init__(self):
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue='mailQueue', durable=True)
        self.subject = ''
        self.message = ''
        self.to_send = ''

    def send_email(self, type, user, token, current_site):
        if type == 'register':

            # subject for mail
            self.subject = "Activate Your ChatApp Account"
            uid = urlsafe_base64_encode(user.pk)
            s = get_short_url(uid)
            print(s.short_id)
            # message body for mail
            self.message = render(request, 'account_activate.html',
                                    {
                                        'user': user,
                                        'domain': current_site.domain,
                                        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                                        'token': token,
                                        's': s
                                    })

            # emails of sender and receiver
            # from_email = settings.EMAIL_HOST_USER
            self.to_send = [user.email]


            # send mail method
            # send_mail(subject, message, from_email, to_send, fail_silently=False)

        # for type reset password
        elif type == 'reset_password':

            # subject for mail
            self.subject = "RESET YOUR PASSWORD"

            # message body for mail
            self.message = render_to_string('password_reset.html',
                                       {
                                           'user': user,
                                           'domain': "localhost:3000",
                                           'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                                           'token': token
                                       })

            # emails of sender and receiver
            # from_email = settings.EMAIL_HOST_USER
            self.to_send = [user.email]


        email_data = {'subject': self.subject, 'message': self.message, 'email': self.to_send}
        Message = json.dumps(email_data)

        self.channel.basic_publish(
            exchange='',
            routing_key='mailQueue',
            body=Message,
            properties=pika.BasicProperties(delivery_mode=2)
        )

        self.connection.close()
            # send mail method
            # send_mail(subject, message, from_email, to_send, fail_silently=False)

        # else:
        #     return None

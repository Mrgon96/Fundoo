"""
    :author: Gaurav Nagoshe
    :since: 17/07/2019
    :overview:

"""

from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from django.core.mail import send_mail
from Fundoo import settings


class SendMail:

    def sendmail(self, type, user, token, current_site):

        """

        :param type: type of mail to be sent
        :param user: user the mail will be sent to
        :param token: token to be sent in url in message
        :param current_site: current site link in mail will redirect to
        :return:
        """
        # for type register
        if type == 'register':

            # subject for mail
            subject = "Activate Your ChatApp Account"

            # message body for mail
            message = render_to_string('account_activate.html',
                                    {
                                        'user': user,
                                        'domain': current_site.domain,
                                        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                                        'token': token
                                    })

            # emails of sender and receiver
            from_email = settings.EMAIL_HOST_USER
            to_send = [user.email]

            # send mail method
            send_mail(subject, message, from_email, to_send, fail_silently=False)

        # for type reset password
        elif type == 'reset_password':

            # subject for mail
            subject = "RESET YOUR PASSWORD"

            # message body for mail
            message = render_to_string('password_reset.html',
                                       {
                                           'user': user,
                                           'domain': current_site.domain,
                                           'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                                           'token': token
                                       })

            # emails of sender and receiver
            from_email = settings.EMAIL_HOST_USER
            to_send = [user.email]

            # send mail method
            send_mail(subject, message, from_email, to_send, fail_silently=False)

        else:
            return None

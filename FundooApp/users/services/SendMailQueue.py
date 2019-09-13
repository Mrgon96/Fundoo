import pika
from .send_mail import SendMail


class SendMailQueue:
    def __init__(self):
        self.connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        self.channel = self.connection.channel()

    def send(self, type, user, token, current_site):
        self.channel.queue_declare(queue='Mail')

        self.channel.basic_publish(exchange='', routing_key='Mail', body='Sending Mail')
        sendmailTo = SendMail()
        sendmailTo.sendmail(type=type, user=user, token=token, current_site=current_site)
        print(" sent Mail")

        self.connection.close()



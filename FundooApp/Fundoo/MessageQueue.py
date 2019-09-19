import os
import pika, json, time, smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv,find_dotenv
from pathlib import *
load_dotenv(find_dotenv())
env_path = Path('.')/'.env'

email_obj = smtplib.SMTP(host=os.getenv('EMAIL_HOST'), port=os.getenv('EMAIL_PORT'))
email_obj.starttls()
email_obj.login(os.getenv('EMAIL_HOST_USER'), os.getenv('EMAIL_HOST_PASSWORD'))

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost')
)
channel = connection.channel()

channel.queue_declare(queue='mailQueue', durable=True)


def callback(ch, method, properties, body):
    x = f" [X] received {body}"

    body1 = json.loads(body)

    msg = MIMEMultipart()

    time.sleep(body.count(b'.'))
    email = body1.get('email')
    message = body1.get('message')
    subject = body1.get('subject')

    msg['From'] = os.getenv('EMAIL_HOST_USER')
    msg['TO'] = email
    msg['Subject'] = subject
    msg.attach(MIMEText(message, 'plain'))

    email_obj.send_message(msg)

    ch.basic_ack(delivery_tag=method.delievery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='mailQueue', on_message_callback=callback, auto_ack=True)
channel.start_consuming()




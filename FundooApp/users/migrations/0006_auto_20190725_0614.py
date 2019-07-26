# Generated by Django 2.2.3 on 2019-07-25 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20190724_0624'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notes',
            old_name='reminder',
            new_name='reminder_date',
        ),
        migrations.AddField(
            model_name='notes',
            name='is_reminder',
            field=models.BooleanField(default=False),
        ),
    ]

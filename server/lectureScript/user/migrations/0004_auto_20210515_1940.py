# Generated by Django 3.1.7 on 2021-05-15 10:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_auto_20210515_1907'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='created',
            new_name='date_joined',
        ),
    ]

# Generated by Django 3.1.7 on 2021-05-24 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0002_auto_20210522_0139'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recording',
            old_name='name',
            new_name='title',
        ),
        migrations.RemoveField(
            model_name='recording',
            name='recordFile',
        ),
        migrations.RemoveField(
            model_name='recording',
            name='user',
        ),
        migrations.AddField(
            model_name='recording',
            name='professor',
            field=models.CharField(default=None, max_length=20),
        ),
        migrations.AddField(
            model_name='recording',
            name='typeScript',
            field=models.TextField(default=None),
        ),
    ]

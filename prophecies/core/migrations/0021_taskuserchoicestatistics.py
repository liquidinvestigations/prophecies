# Generated by Django 3.2.9 on 2022-01-20 16:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0020_auto_20220119_1308'),
    ]

    operations = [
        migrations.CreateModel(
            name='TaskUserChoiceStatistics',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('round', models.IntegerField(help_text='Round number of the static entry')),
                ('count', models.IntegerField(default=0)),
                (
                'checker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('choice', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL,
                                             to='core.choice')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.task')),
            ],
            options={
                'unique_together': {('task_id', 'choice_id', 'round', 'checker')},
            },
        ),
    ]

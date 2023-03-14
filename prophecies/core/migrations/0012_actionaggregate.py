# Generated by Django 3.2.9 on 2021-12-13 17:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from prophecies.apps import create_aggregate_on_action_save


def create_aggregates(apps, schema_editor):
    Action = apps.get_model('actstream', 'Action')
    for action in Action.objects.all():
        create_aggregate_on_action_save(None, action)


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0011_auto_20211104_1712'),
    ]

    operations = [
        migrations.CreateModel(
            name='ActionAggregate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('verb', models.CharField(max_length=100)),
                ('date', models.DateField(blank=True, null=True)),
                ('count', models.IntegerField(default=0)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL,
                                           to=settings.AUTH_USER_MODEL)),
                ('task', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL,
                                           to='core.task')),

            ],
        ),
        migrations.RunPython(create_aggregates, migrations.RunPython.noop)
    ]

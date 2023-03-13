# Generated by Django 3.2.7 on 2021-10-01 09:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ('core', '0009_task_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='choice',
            name='shortkeys',
            field=models.CharField(blank=True, help_text='Comma separated list of shortkeys to pick this choice',
                                   max_length=100, null=True),
        ),
        migrations.CreateModel(
            name='SettingVisibility',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('public', models.BooleanField(default=False,
                                               verbose_name='Make a setting public (visible without authentication)')),
                ('setting', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='core.setting')),
            ],
        ),
    ]

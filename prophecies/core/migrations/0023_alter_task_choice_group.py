# Generated by Django 3.2.9 on 2022-03-30 12:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0022_auto_20220202_1354'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='choice_group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='core.choicegroup', verbose_name='Choices'),
        ),
    ]

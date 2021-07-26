from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient, force_authenticate
from unittest import mock
import os

class TestSetting(TestCase):
    client = APIClient()
    fixtures = ['settings.json', 'users.json']


    def test_it_returns_all_settings(self):
        self.client.login(username='olivia', password='olivia')
        request = self.client.get('/api/v1/settings.json')
        self.assertIn({ 'key': 'defaultLocale', 'value': 'en' }, request.json())


    @mock.patch.dict(os.environ, {"PROPHECIES_APP_FOO": "bar"})
    def test_it_returns_setting_from_env(self):
        self.client.login(username='olivia', password='olivia')
        request = self.client.get('/api/v1/settings.json')
        self.assertIn({ 'key': 'foo', 'value': 'bar' }, request.json())


    @mock.patch.dict(os.environ, {"PROPHECIES_APP_FOO_BAZ": "bar"})
    def test_it_returns_camel_case_setting_from_env(self):
        self.client.login(username='olivia', password='olivia')
        request = self.client.get('/api/v1/settings.json')
        self.assertIn({ 'key': 'fooBaz', 'value': 'bar' }, request.json())


    @mock.patch.dict(os.environ, {"PROPHECIES_APP_DEFAULT_LOCALE": "fr"})
    def test_it_returns_setting_from_env_without_overriding_db_values(self):
        self.client.login(username='olivia', password='olivia')
        request = self.client.get('/api/v1/settings.json')
        self.assertIn({ 'key': 'defaultLocale', 'value': 'en' }, request.json())
        self.assertNotIn({ 'key': 'defaultLocale', 'value': 'fr' }, request.json())

    @mock.patch.dict(os.environ, {"PROPHECIES_APP_DEFAULT_LOCALE": "fr"})
    def test_it_returns_single_setting_from_env_without_overriding_db_values(self):
        self.client.login(username='olivia', password='olivia')
        request = self.client.get('/api/v1/settings/defaultLocale.json')
        self.assertEqual(request.json().get('key'), 'defaultLocale')
        self.assertEqual(request.json().get('value'), 'en')


    def test_it_reject_unauthenticated_request(self):
        self.client.logout()
        request = self.client.get('/api/v1/settings.json')
        self.assertEqual(request.status_code, 403)

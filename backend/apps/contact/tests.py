from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.contact.models import ContactMessage


class ContactAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_send_valid_contact_message(self):
        url = reverse('contact-send')
        payload = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "subject": "Freelance Project",
            "message": "Hi Rushikesh, I'd like to collaborate on a Django + React project.",
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data.get('success'))
        self.assertEqual(ContactMessage.objects.count(), 1)
        self.assertEqual(ContactMessage.objects.first().name, "Jane Doe")

    def test_send_invalid_contact_message(self):
        url = reverse('contact-send')
        payload = {
            "name": "",
            "email": "not-an-email",
            "message": "hi",
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ContactMessage.objects.count(), 0)

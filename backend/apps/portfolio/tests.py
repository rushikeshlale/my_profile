from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.portfolio.models import Profile, Skill, Project, Experience, SocialLink


class PortfolioAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.profile = Profile.objects.create(
            full_name="Rushikesh",
            title="Full Stack Developer",
            short_bio="Short Bio",
            bio="Detailed Bio",
            email="test@example.com",
            location="India",
            years_of_experience=2,
            projects_completed=10,
            is_active=True,
        )
        self.skill = Skill.objects.create(
            name="React",
            category="frontend",
            proficiency=90,
            is_featured=True,
            order=1,
        )
        self.project = Project.objects.create(
            title="Portfolio Project",
            slug="portfolio-project",
            summary="Awesome portfolio",
            description="Built with Django & React",
            technologies="React, Django, PostgreSQL",
            is_featured=True,
        )

    def test_get_portfolio_overview(self):
        url = reverse('portfolio-overview')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('profile', response.data)
        self.assertIn('skills', response.data)
        self.assertIn('projects', response.data)
        self.assertEqual(response.data['profile']['full_name'], 'Rushikesh')

    def test_get_skills_list(self):
        url = reverse('skill-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_projects_list(self):
        url = reverse('project-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

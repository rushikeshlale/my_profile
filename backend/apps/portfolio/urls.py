from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProfileViewSet,
    SkillViewSet,
    ProjectViewSet,
    ExperienceViewSet,
    SocialLinkViewSet,
    PortfolioOverviewView,
)

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet, basename='profile')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'experiences', ExperienceViewSet, basename='experience')
router.register(r'social-links', SocialLinkViewSet, basename='social-link')

urlpatterns = [
    path('overview/', PortfolioOverviewView.as_view(), name='portfolio-overview'),
    path('', include(router.urls)),
]

from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile, Skill, Project, Experience, SocialLink
from .serializers import (
    ProfileSerializer,
    SkillSerializer,
    ProjectSerializer,
    ExperienceSerializer,
    SocialLinkSerializer,
    PortfolioOverviewSerializer,
)


class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.filter(is_active=True)
    serializer_class = ProfileSerializer
    permission_classes = [permissions.AllowAny]


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all().order_by('order', 'name')
    serializer_class = SkillSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None  # Return all skills for frontend filtering / categorizing


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by('order', '-created_at')
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    pagination_class = None

    def get_queryset(self):
        qs = super().get_queryset()
        featured = self.request.query_params.get('featured')
        if featured is not None:
            qs = qs.filter(is_featured=featured.lower() in ['true', '1'])
        return qs


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all().order_by('order', '-id')
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


class SocialLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SocialLink.objects.all().order_by('order')
    serializer_class = SocialLinkSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


class PortfolioOverviewView(APIView):
    """
    Returns complete portfolio data in one request for snappy frontend initial hydration.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        profile = Profile.objects.filter(is_active=True).first()
        skills = Skill.objects.all().order_by('order', 'name')
        projects = Project.objects.all().order_by('order', '-created_at')
        experiences = Experience.objects.all().order_by('order', '-id')
        social_links = SocialLink.objects.all().order_by('order')

        data = {
            'profile': ProfileSerializer(profile, context={'request': request}).data if profile else None,
            'skills': SkillSerializer(skills, many=True, context={'request': request}).data,
            'projects': ProjectSerializer(projects, many=True, context={'request': request}).data,
            'experiences': ExperienceSerializer(experiences, many=True, context={'request': request}).data,
            'social_links': SocialLinkSerializer(social_links, many=True, context={'request': request}).data,
        }
        return Response(data, status=status.HTTP_200_OK)

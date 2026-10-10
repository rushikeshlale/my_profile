from rest_framework import serializers
from .models import Profile, Skill, Project, Experience, SocialLink


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'id',
            'full_name',
            'title',
            'short_bio',
            'bio',
            'avatar',
            'resume',
            'email',
            'phone',
            'location',
            'years_of_experience',
            'projects_completed',
            'is_active',
        ]


class SkillSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Skill
        fields = [
            'id',
            'name',
            'category',
            'category_display',
            'proficiency',
            'icon_name',
            'is_featured',
            'order',
        ]


class ProjectSerializer(serializers.ModelSerializer):
    tech_list = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'slug',
            'summary',
            'description',
            'image',
            'image_url',
            'technologies',
            'tech_list',
            'live_demo_url',
            'github_url',
            'is_featured',
            'order',
            'created_at',
        ]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'id',
            'role',
            'company',
            'company_url',
            'location',
            'start_date',
            'end_date',
            'is_current',
            'description',
            'order',
        ]


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = [
            'id',
            'platform',
            'url',
            'icon_name',
            'order',
        ]


class PortfolioOverviewSerializer(serializers.Serializer):
    """Aggregated serializer to fetch all portfolio sections in a single roundtrip if desired."""
    profile = ProfileSerializer()
    skills = SkillSerializer(many=True)
    projects = ProjectSerializer(many=True)
    experiences = ExperienceSerializer(many=True)
    social_links = SocialLinkSerializer(many=True)

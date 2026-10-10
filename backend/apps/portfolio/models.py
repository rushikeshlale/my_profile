from django.db import models


class Profile(models.Model):
    """Profile information of the portfolio owner."""
    full_name = models.CharField(max_length=150)
    title = models.CharField(max_length=200, help_text="e.g. Full Stack Python / Django & React Developer")
    short_bio = models.CharField(max_length=300, help_text="A catchy one-liner summary")
    bio = models.TextField(help_text="Detailed about-me description")
    avatar = models.ImageField(upload_to='profiles/avatars/', blank=True, null=True)
    resume = models.FileField(upload_to='profiles/resumes/', blank=True, null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    location = models.CharField(max_length=150, default="India")
    years_of_experience = models.PositiveIntegerField(default=1)
    projects_completed = models.PositiveIntegerField(default=10)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"
        ordering = ['-is_active', '-updated_at']

    def __str__(self):
        return f"{self.full_name} ({self.title})"


class SkillCategory(models.TextChoices):
    FRONTEND = 'frontend', 'Frontend'
    BACKEND = 'backend', 'Backend'
    DATABASE = 'database', 'Database & ORM'
    DEVOPS_TOOLS = 'devops_tools', 'DevOps & Tools'
    OTHER = 'other', 'Other Skills'


class Skill(models.Model):
    """Technical skill representation."""
    name = models.CharField(max_length=100)
    category = models.CharField(
        max_length=30,
        choices=SkillCategory.choices,
        default=SkillCategory.FRONTEND
    )
    proficiency = models.PositiveIntegerField(
        default=85,
        help_text="Proficiency percentage (0-100)"
    )
    icon_name = models.CharField(
        max_length=60,
        blank=True,
        help_text="Lucide or simple icon identifier (e.g. Code2, Database, Server, Globe)"
    )
    is_featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Skill"
        verbose_name_plural = "Skills"
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Project(models.Model):
    """Portfolio project showcasing work."""
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    summary = models.CharField(max_length=350, help_text="Brief card description")
    description = models.TextField(help_text="Full case study or project explanation")
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, help_text="Fallback external image URL")
    technologies = models.CharField(
        max_length=300,
        help_text="Comma-separated technologies e.g. React, Django, PostgreSQL, Tailwind"
    )
    live_demo_url = models.URLField(max_length=500, blank=True)
    github_url = models.URLField(max_length=500, blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

    @property
    def tech_list(self):
        return [t.strip() for t in self.technologies.split(',') if t.strip()]


class Experience(models.Model):
    """Work experience and milestones."""
    role = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    company_url = models.URLField(max_length=500, blank=True)
    location = models.CharField(max_length=150, blank=True)
    start_date = models.CharField(max_length=50, help_text="e.g. Jun 2024 or 2023")
    end_date = models.CharField(max_length=50, blank=True, help_text="e.g. Present or Dec 2024")
    is_current = models.BooleanField(default=False)
    description = models.TextField(help_text="Key responsibilities and achievements")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Experience"
        verbose_name_plural = "Experiences"
        ordering = ['order', '-id']

    def __str__(self):
        return f"{self.role} @ {self.company}"


class SocialLink(models.Model):
    """External social profiles."""
    platform = models.CharField(max_length=100, help_text="e.g. GitHub, LinkedIn, Twitter, LeetCode")
    url = models.URLField(max_length=500)
    icon_name = models.CharField(max_length=60, help_text="Icon identifier e.g. Github, Linkedin, Twitter, Mail")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Social Link"
        verbose_name_plural = "Social Links"
        ordering = ['order', 'platform']

    def __str__(self):
        return self.platform

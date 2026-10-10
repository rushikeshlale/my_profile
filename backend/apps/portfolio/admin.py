from django.contrib import admin
from .models import Profile, Skill, Project, Experience, SocialLink


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'title', 'email', 'years_of_experience', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('full_name', 'title', 'bio', 'email')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'is_featured', 'order')
    list_filter = ('category', 'is_featured')
    list_editable = ('proficiency', 'is_featured', 'order')
    search_fields = ('name',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_featured', 'order', 'created_at')
    list_filter = ('is_featured',)
    list_editable = ('is_featured', 'order')
    search_fields = ('title', 'technologies', 'summary')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'company', 'start_date', 'end_date', 'is_current', 'order')
    list_filter = ('is_current',)
    list_editable = ('order',)
    search_fields = ('role', 'company', 'description')


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('platform', 'url', 'icon_name', 'order')
    list_editable = ('order',)
    search_fields = ('platform',)

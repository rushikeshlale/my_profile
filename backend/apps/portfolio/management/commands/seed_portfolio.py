from django.core.management.base import BaseCommand
from apps.portfolio.models import Profile, Skill, SkillCategory, Project, Experience, SocialLink


class Command(BaseCommand):
    help = 'Seeds initial portfolio data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Seeding portfolio data..."))

        # Profile
        profile, created = Profile.objects.get_or_create(
            email="rushikeshlale1@gmail.com",
            defaults={
                "full_name": "Rushikesh",
                "title": "Full Stack Developer (Fresher)",
                "short_bio": "Passionate Fresher Full Stack Developer skilled in React, Tailwind CSS, Django REST Framework, and PostgreSQL with hands-on internship experience.",
                "bio": "I am a motivated Fresher Full Stack Developer with practical foundation in frontend architectures (React, Vite, Tailwind CSS) and backend systems (Django, DRF, PostgreSQL). Completed internship at DOM Enterprises with focus on building clean APIs and responsive interfaces.",
                "phone": "+91 7823047414",
                "location": "Pune, India",
                "years_of_experience": 0,
                "projects_completed": 12,
                "is_active": True,
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS("Created Profile"))
        else:
            self.stdout.write(self.style.WARNING("Profile already exists"))

        # Skills
        skills_data = [
            # Frontend
            {"name": "React.js", "category": SkillCategory.FRONTEND, "proficiency": 92, "icon_name": "Code2", "is_featured": True, "order": 1},
            {"name": "JavaScript (ES6+)", "category": SkillCategory.FRONTEND, "proficiency": 95, "icon_name": "FileCode", "is_featured": True, "order": 2},

            {"name": "HTML5 / CSS3", "category": SkillCategory.FRONTEND, "proficiency": 95, "icon_name": "Layout", "is_featured": True, "order": 4},


            # Backend
            {"name": "Python", "category": SkillCategory.BACKEND, "proficiency": 94, "icon_name": "Terminal", "is_featured": True, "order": 6},
            {"name": "Django", "category": SkillCategory.BACKEND, "proficiency": 92, "icon_name": "Server", "is_featured": True, "order": 7},
            {"name": "Django REST Framework", "category": SkillCategory.BACKEND, "proficiency": 90, "icon_name": "Cpu", "is_featured": True, "order": 8},
            {"name": "FastAPI", "category": SkillCategory.BACKEND, "proficiency": 85, "icon_name": "Zap", "is_featured": True, "order": 9},

            # Database
            {"name": "PostgreSQL", "category": SkillCategory.DATABASE, "proficiency": 88, "icon_name": "Database", "is_featured": True, "order": 10},
            {"name": "SQLite", "category": SkillCategory.DATABASE, "proficiency": 90, "icon_name": "Database", "is_featured": False, "order": 11},
            {"name": "Django ORM", "category": SkillCategory.DATABASE, "proficiency": 92, "icon_name": "Workflow", "is_featured": True, "order": 12},

            # DevOps & Tools
            {"name": "Git & GitHub", "category": SkillCategory.DEVOPS_TOOLS, "proficiency": 90, "icon_name": "GitBranch", "is_featured": True, "order": 13},
            {"name": "Postman", "category": SkillCategory.DEVOPS_TOOLS, "proficiency": 88, "icon_name": "Send", "is_featured": True, "order": 14},
            {"name": "Linux / Bash", "category": SkillCategory.DEVOPS_TOOLS, "proficiency": 80, "icon_name": "Terminal", "is_featured": False, "order": 15},
            {"name": "Docker Basics", "category": SkillCategory.DEVOPS_TOOLS, "proficiency": 75, "icon_name": "Box", "is_featured": False, "order": 16},
        ]

        for s in skills_data:
            Skill.objects.get_or_create(name=s["name"], defaults=s)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(skills_data)} skills"))

        # Projects
        projects_data = [
            {
                "title": "Blog Application - Django",
                "slug": "blog-application-django",
                "summary": "Full-stack blog application with user authentication, role-based access, CRUD operations, relational data models with Django ORM, and category search.",
                "description": "Built with Django templates, Bootstrap, and Django ORM. Features user registration, role-based access control, post authoring, search filtering, and responsive UI.",
                "image_url": "/images/django_blog.png",
                "technologies": "Python, Django, Django ORM, Bootstrap, SQLite3, HTML5, CSS3",
                "live_demo_url": "",
                "github_url": "https://github.com/rushikeshlale/django-blog",
                "is_featured": True,
                "order": 1,
            },
            {
                "title": "Student - Teacher Management Portal",
                "slug": "student-teacher-management-portal",
                "summary": "Backend-centric management system managing student-teacher relationships with academic year-based mapping and RESTful APIs.",
                "description": "Engineered with FastAPI and SQLAlchemy with PostgreSQL. Features password hashing, role-based access, year-based teacher allocation logic, request validation, and centralized error handling with Pydantic.",
                "image_url": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60",
                "technologies": "FastAPI, Python, SQLAlchemy, PostgreSQL, Pydantic, REST API, JWT",
                "live_demo_url": "",
                "github_url": "https://github.com/",
                "is_featured": True,
                "order": 2,
            },
            {
                "title": "Resume Builder Web Application",
                "slug": "resume-builder-web-application",
                "summary": "Interactive web application enabling users to create, edit, live preview, and download ATS-friendly professional resumes as PDF.",
                "description": "Designed dynamic section-based form architecture for structured resume data handling, real-time preview, client/server validation, and PDF export functionality.",
                "image_url": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60",
                "technologies": "React, JavaScript, Tailwind CSS, Python, PDF Export, HTML5",
                "live_demo_url": "",
                "github_url": "https://github.com/",
                "is_featured": True,
                "order": 3,
            },
            {
                "title": "GreatKart - E-Commerce Web Application",
                "slug": "greatkart-ecommerce-application",
                "summary": "Comprehensive full-stack e-commerce platform with email verification, product variants, search/filtering, reviews, and session cart.",
                "description": "Developed with Django, SQLite3, and JavaScript. Features role-based auth, session-based shopping cart with dynamic tax & price calculation, user dashboard with order history, and automated SMTP notifications.",
                "image_url": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=60",
                "technologies": "Python, Django, JavaScript, SQLite3, HTML5, CSS3, SMTP Email",
                "live_demo_url": "",
                "github_url": "https://github.com/rushikeshlale/greatkart-django",
                "is_featured": True,
                "order": 4,
            },
            {
                "title": "AI-Assisted Box Selection System",
                "slug": "ai-assisted-box-selection-system",
                "summary": "Intelligent REST API backend service utilizing optimization algorithms to select optimal packaging box sizes for products.",
                "description": "Built with Django REST Framework, serializers, model constraints, custom box-packing algorithms based on dimensions & weight, and comprehensive automated test suites.",
                "image_url": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60",
                "technologies": "Python, Django REST Framework, REST API, Algorithms, PyTest",
                "live_demo_url": "",
                "github_url": "https://github.com/rushikeshlale/ai-assisted-box-selection-system",
                "is_featured": True,
                "order": 5,
            },
        ]

        for p in projects_data:
            Project.objects.get_or_create(slug=p["slug"], defaults=p)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(projects_data)} projects"))

        # Experiences / Internships
        experiences_data = [
            {
                "role": "Intern",
                "company": "DOM Enterprises",
                "company_url": "",
                "location": "Mumbai, India",
                "start_date": "2 March 2026",
                "end_date": "31 July 2026",
                "is_current": False,
                "description": "Worked on IM Tools, an internal e-commerce software platform designed for managing industrial materials and services, primarily used by service and maintenance agencies. Provided technical support, Identified and fixed minor UI/UX issues to help ensure smooth day-to-day application usage.",
                "order": 1,
            },
        ]

        for exp in experiences_data:
            Experience.objects.get_or_create(role=exp["role"], company=exp["company"], defaults=exp)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(experiences_data)} experiences"))

        # Social Links
        socials_data = [
            {"platform": "GitHub", "url": "https://github.com/rushikeshlale", "icon_name": "Github", "order": 1},
            {"platform": "LinkedIn", "url": "https://linkedin.com", "icon_name": "Linkedin", "order": 2},
            {"platform": "Twitter / X", "url": "https://x.com", "icon_name": "Twitter", "order": 3},
            {"platform": "Email", "url": "mailto:rushikeshlale1@gmail.com", "icon_name": "Mail", "order": 4},
        ]

        for s in socials_data:
            SocialLink.objects.get_or_create(platform=s["platform"], defaults=s)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(socials_data)} social links"))

        self.stdout.write(self.style.SUCCESS("Successfully completed seeding!"))

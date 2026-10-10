# 🚀 Full Stack Developer Portfolio (React + Django REST + PostgreSQL)

A modern, production-ready, full-stack developer portfolio web application built with a decoupled architecture featuring **React (Vite)** on the frontend and **Django REST Framework + PostgreSQL** on the backend.

---

## 🌟 Tech Stack

| Layer | Technology | Key Details |
| :--- | :--- | :--- |
| **Frontend** | **React 18 / 19** with **Vite** | Fast HMR, ES6+ JavaScript (Clean JS, NO TypeScript), Component modularity |
| **Styling** | **Tailwind CSS** | Dark/Light Mode, Glassmorphism, Micro-animations, Curated palette |
| **Backend** | **Django 5.x & Django REST Framework** | Versioned RESTful API (`/api/v1/`), Django ORM, Clean App Architecture |
| **Database** | **PostgreSQL** (with SQLite fallback) | Fully configured with 12-factor environment variables |
| **Security** | **CORS Headers, Dotenv** | Parameterized credentials, Whitelisted origins, No hardcoded secrets |
| **Version Control**| **Git & GitHub** | Comprehensive `.gitignore`, Production structure |

---

## 📂 Project Structure

```text
my_portfolio/
├── .gitignore                      # Top-level gitignore for Python, Node, media, env
├── README.md                       # Complete documentation and setup guide
│
├── backend/                        # Django REST Framework Backend
│   ├── .env.example                # Example environment variables template
│   ├── .env                        # Local development environment configuration
│   ├── requirements.txt            # Python dependencies (Django, DRF, psycopg, Pillow, etc.)
│   ├── manage.py                   # Django CLI utility
│   ├── core/                       # Project configuration
│   │   ├── __init__.py
│   │   ├── settings.py             # Environment-driven settings, CORS, Database config
│   │   ├── urls.py                 # Root URL configuration with API versioning
│   │   ├── wsgi.py                 # WSGI entry point
│   │   └── asgi.py                 # ASGI entry point
│   └── apps/                       # Modular Django apps
│       ├── portfolio/              # Profile, Skills, Projects, Experience, Socials
│       │   ├── models.py
│       │   ├── serializers.py
│       │   ├── views.py
│       │   ├── urls.py
│       │   ├── admin.py
│       │   ├── tests.py
│       │   └── management/commands/seed_portfolio.py
│       └── contact/                # Contact form submissions & inquiries
│           ├── models.py
│           ├── serializers.py
│           ├── views.py
│           ├── urls.py
│           ├── admin.py
│           └── tests.py
│
└── frontend/                       # React + Vite Frontend
    ├── .env.example                # Frontend environment template
    ├── .env                        # Local frontend environment config
    ├── package.json                # NPM dependencies and scripts
    ├── vite.config.js              # Vite server & build configuration
    ├── tailwind.config.js          # Tailwind CSS theme & token settings
    ├── postcss.config.js           # PostCSS setup
    ├── index.html                  # HTML entry point with metadata
    └── src/
        ├── main.jsx                # React root mount
        ├── App.jsx                 # Main layout & section orchestration
        ├── index.css               # Global typography, glassmorphism & styles
        ├── context/
        │   └── ThemeContext.jsx    # Dark / Light theme state & persistence
        ├── api/
        │   ├── axios.js            # Axios client with base URL & interceptors
        │   └── portfolioService.js # Typed API calls for portfolio & contact endpoints
        ├── utils/
        │   └── constants.js        # Fallback datasets and defaults
        └── components/
            ├── common/             # Reusable UI components
            │   ├── Navbar.jsx
            │   ├── Footer.jsx
            │   ├── Button.jsx
            │   ├── Badge.jsx
            │   ├── Card.jsx
            │   ├── SectionHeading.jsx
            │   ├── Toast.jsx
            │   └── Icons.jsx
            └── sections/           # Modular page sections
                ├── HeroSection.jsx
                ├── AboutSection.jsx
                ├── SkillsSection.jsx
                ├── ProjectsSection.jsx
                ├── ExperienceSection.jsx
                └── ContactSection.jsx
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Python 3.10+** (Python 3.12 / 3.14 recommended)
- **Node.js 18+** & **npm**
- **PostgreSQL** (Optional for local testing as SQLite fallback is built-in)

---

### 2. Backend Setup (Django & DRF)

1. Open a terminal in the `backend/` directory:
   ```bash
   cd backend
   ```

2. (Optional but recommended) Create and activate a Python virtual environment:
   ```bash
   # Windows (PowerShell)
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # macOS / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure your `.env` file:
   ```bash
   # Copy example template
   cp .env.example .env
   ```
   *Edit `.env` to configure your PostgreSQL credentials:*
   ```ini
   DJANGO_SECRET_KEY=your-secure-django-key
   DJANGO_DEBUG=True
   DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

   DB_ENGINE=django.db.backends.postgresql
   DB_NAME=portfolio_db
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password
   DB_HOST=localhost
   DB_PORT=5432

   CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
   ```

5. Run migrations & seed initial portfolio data:
   ```bash
   python manage.py migrate
   python manage.py seed_portfolio
   ```

6. Create a superuser for Django Admin:
   ```bash
   python manage.py createsuperuser
   ```

7. Start the development server:
   ```bash
   python manage.py runserver 8000
   ```
   *Backend is available at: `http://127.0.0.1:8000/`*  
   *Django Admin is available at: `http://127.0.0.1:8000/admin/`*

---

### 3. Frontend Setup (React with Vite & Tailwind CSS)

1. In a separate terminal, navigate to `frontend/`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure `.env`:
   ```bash
   cp .env.example .env
   ```
   *Verify the API URL matches your Django server:*
   ```ini
   VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
   ```

4. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   *Frontend is available at: `http://localhost:5173/`*

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/portfolio/overview/` | Returns full portfolio aggregated (Profile, Skills, Projects, Experience, Socials) |
| `GET` | `/api/v1/portfolio/profiles/` | List active profile details |
| `GET` | `/api/v1/portfolio/skills/` | List all technical skills categorized |
| `GET` | `/api/v1/portfolio/projects/` | List projects (supports `?featured=true` filter) |
| `GET` | `/api/v1/portfolio/experiences/` | List work experience and career milestones |
| `GET` | `/api/v1/portfolio/social-links/` | List social media profiles and links |
| `POST` | `/api/v1/contact/send/` | Submit a contact inquiry / message |

---

## 🔒 Security Best Practices

1. **Environment Variables**: Sensitive secrets (secret keys, database passwords, API keys) are strictly loaded from `.env` and excluded from git tracking.
2. **CORS Security**: Cross-Origin Resource Sharing is locked down to explicit origins via `CORS_ALLOWED_ORIGINS`.
3. **Database Input Sanitization**: Uses Django ORM parameterized queries to prevent SQL injections.
4. **DRF Serializers**: Input validation on all contact inquiries and form submissions.

---

## 🧪 Running Automated Tests

Run backend unit tests:
```bash
python backend/manage.py test apps.portfolio apps.contact
```

Run frontend production build validation:
```bash
cd frontend
npm run build
```

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

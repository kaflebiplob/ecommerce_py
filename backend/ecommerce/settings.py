"""
Django settings for ecommerce project.
"""

from pathlib import Path
import os
from dotenv import load_dotenv
from datetime import timedelta
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv()

# ===========================
# SECURITY
# ===========================
SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = os.getenv("DEBUG", "False").lower() == "true"

# Security settings for production
if not DEBUG:
    ALLOWED_HOSTS = [
        "ecommerce-py-0rtu.onrender.com",
        "ecommercepy.vercel.app",
        "localhost",
        "127.0.0.1",
    ]
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
else:
    ALLOWED_HOSTS = ["*"]
    SECURE_SSL_REDIRECT = False

# ===========================
# INSTALLED APPS
# ===========================
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'corsheaders',
    'rest_framework',

    # Local apps
    'accounts',
    'products',
    'cart',
    'orders',
    'reviews',
    'support',
    'address',
    'wishlist',
    'payments',
    'discount',
    'adminpanel',
]

# ===========================
# MIDDLEWARE
# ===========================
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = 'ecommerce.urls'

# ===========================
# TEMPLATES
# ===========================
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ecommerce.wsgi.application'

# ===========================
# DATABASE (FROM ENV ONLY)
# ===========================
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("❌ DATABASE_URL is missing in environment variables!")

DATABASES = {
    "default": dj_database_url.parse(
        DATABASE_URL,
        conn_max_age=600,
        ssl_require=True
    )
}

# ===========================
# PASSWORD VALIDATION
# ===========================
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ===========================
# INTERNATIONALIZATION
# ===========================
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ===========================
# STATIC & MEDIA
# ===========================
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / "media"

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# ===========================
# REST FRAMEWORK (JWT)
# ===========================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ]
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=180),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "AUTH_HEADER_TYPES": ("Bearer",),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
}

# ===========================
# EMAIL
# ===========================
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# ===========================
# CORS / CSRF
# ===========================
CORS_ALLOWED_ORIGINS = [
    "https://ecommercepy.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
]

CSRF_TRUSTED_ORIGINS = [
    "https://ecommercepy.vercel.app",
    "https://*.onrender.com",
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "origin",
    "user-agent",
    "dnt",
    "cache-control",
    "x-requested-with",
]

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ===========================
# AUTO CREATE ADMIN ON STARTUP (SAFE VERSION)
# ===========================
def create_admin_user():
    """
    Auto-create admin user when Django starts
    This runs after all settings are loaded
    """
    try:
        # Import here to avoid circular imports
        from django.contrib.auth import get_user_model
        from django.db.utils import OperationalError, ProgrammingError
        
        User = get_user_model()
        
        # Use environment variables with fallbacks
        username = os.getenv('ADMIN_USERNAME', 'admin')
        email = os.getenv('ADMIN_EMAIL', 'admin@ecommerce.com')
        password = os.getenv('ADMIN_PASSWORD', 'admin123')
        
        # Check if admin user exists
        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password  # Django automatically hashes this
            )
            print(f"✅ Auto-created admin user: {username} / {password}")
        else:
            print(f"ℹ️ Admin user '{username}' already exists")
            
    except (OperationalError, ProgrammingError):
        # Database tables might not be created yet
        print("⚠️ Database not ready yet, admin creation will be attempted on next startup")
    except Exception as e:
        print(f"⚠️ Error creating admin user: {e}")

# Initialize Django properly before creating admin
import django
from django.conf import settings

if not settings.configured:
    django.setup()

# Create admin user
create_admin_user()
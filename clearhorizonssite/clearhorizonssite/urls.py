from django.contrib import admin
from django.urls import path, include, re_path
from .views import index
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ch_base/', include('ch_base.urls')),  # Include your API URLs
    re_path(r'^.*$', index)
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
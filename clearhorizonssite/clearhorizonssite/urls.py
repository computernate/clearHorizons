from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import RedirectView

from .views import index
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ch_base/', include('ch_base.urls')),  # Include your API URLs
    path('price_configurations/', include('price_configurations.urls')),
    re_path(r'^.*$', index),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns += [re_path(r'^.*$', index)]
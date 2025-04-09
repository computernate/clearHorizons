from django.urls import path
from .views import *

urlpatterns = [
    path("job_types/", JobTypeListAPIView.as_view(), name="job-types"),
    path('job_types/<int:pk>/', JobTypeDetailView.as_view(), name='job_type_detail'),
    path('api/job_type_frequencies/', JobFrequenciesListView.as_view(), name='job_type_frequencies'),
    path('documentation/', model_documentation, name='model_documentation'),
]
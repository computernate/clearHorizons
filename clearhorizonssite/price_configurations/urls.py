from django.urls import path
from .views import *

urlpatterns = [
    path("job_types/", JobTypeListAPIView.as_view(), name="job-types"),
    path('job_types/<int:pk>/', JobTypeDetailView.as_view(), name='job_type_detail'),
    path('api/job_type_frequencies/', JobFrequenciesListView.as_view(), name='job_type_frequencies'),
    path('documentation/', model_documentation, name='model_documentation'),
    
    # Employee and scheduling endpoints
    path('employees/', EmployeeListAPIView.as_view(), name='employees'),
    path('employees/<int:pk>/', EmployeeDetailAPIView.as_view(), name='employee_detail'),
    path('check_availability/', CheckAvailabilityView.as_view(), name='check_availability'),
    path('month_availability/', MonthAvailabilityView.as_view(), name='month_availability'),
]
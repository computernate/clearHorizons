from django.urls import path
from .views import hello_world, submit_form, contact

urlpatterns = [
    path('hello/', hello_world),
    path('submit-form/', submit_form, name="submit-form"),
    path('contact/', contact, name="contact"),
]
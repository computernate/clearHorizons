from django.urls import path
from .views import *

urlpatterns = [
    path('hello/', hello_world),
    path('submit-form/', submit_form, name="submit-form"),
    path('submit-form-quote/', submit_quote_form, name="submit-form-quote"),
    path('contact/', contact, name="contact"),
]
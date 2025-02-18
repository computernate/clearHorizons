import json
import os

from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello from Django API!"})

def format_form_data(data, indent=0):
    """
    Recursively format form data into a string.
    """
    formatted_str = ""
    indent_space = "    " * indent  # Adjust indentation

    for key, value in data.items():
        if isinstance(value, dict):  # If the value is another dictionary, recurse
            formatted_str += f"{indent_space}{key}: {{\n"
            formatted_str += format_form_data(value, indent + 1)
            formatted_str += f"{indent_space}}}\n"
        else:
            formatted_str += f"{indent_space}{key}: {value}\n"

    return formatted_str


@csrf_exempt
def submit_form(request):
    print("Fuck you")
    if request.method == "POST":
        return JsonResponse({"message": "Form submitted successfully"}, status=200)
        try:
            data = json.loads(request.body)
            client_name = data.get("clientName")
            client_email = data.get("email")
            phone = data.get("phone")
            special_instructions = data.get("specialInstructions")
            street_address = data.get("streetAddress")
            city = data.get("city")
            state = data.get("state")
            zip_code = data.get("zipCode")

            # Email content
            confirmation_subject = "Thank You for Your Request!"
            confirmation_message = f"Dear {client_name},\n\nThank you for your request. We will get back to you soon.\n\nDetails:\nPhone: {phone}\nAddress: {street_address}, {city}, {state} {zip_code}\n\nSpecial Instructions: {special_instructions}\n\nBest,\nClear Horizons"

            internal_subject = "New Service Request Received"
            internal_message = f"A new service request has been submitted.\n\nClient Name: {client_name}\nEmail: {client_email}\nPhone: {phone}\nAddress: {street_address}, {city}, {state} {zip_code}\n\nSpecial Instructions: {special_instructions}\n\n"

            formatted_data = format_form_data(data)
            internal_message += formatted_data
            print(internal_message)
            # Send confirmation email to client
            send_mail(
                confirmation_subject,
                confirmation_message,
                'clearhorizon.utah@gmail.com',
                [client_email],
                fail_silently=False,
            )

            # Send internal notification email
            send_mail(
                internal_subject,
                internal_message,
                'clearhorizon.utah@gmail.com',
                ['clearhorizon.utah@gmail.com'],
                fail_silently=False,
            )

            return JsonResponse({"message": "Form submitted successfully"}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)



@csrf_exempt
def contact(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            client_name = data.get("name")
            client_email = data.get("email")
            message = data.get("message")

            # Email content
            confirmation_subject = "Thank You for Your Request!"
            confirmation_message = f"Dear {client_name},\n\nThank you for your request. We will get back to you soon.\n\nDetails:\n{message}\n"

            internal_subject = "New Service Request Received"
            internal_message = f"A new service request has been submitted.\n\nClient Name: {client_name}\nEmail: {client_email}\n{message}"

            # Send confirmation email to client
            send_mail(
                confirmation_subject,
                confirmation_message,
                'clearhorizons.utah@gmail.com',
                [client_email],
                fail_silently=False,
            )

            # Send internal notification email
            send_mail(
                internal_subject,
                internal_message,
                'clearhorizons.utah@gmail.com',
                ['clearhorizons.utah@gmail.com'],
                fail_silently=False,
            )

            return JsonResponse({"message": "Form submitted successfully"}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)
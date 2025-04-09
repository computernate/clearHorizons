from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import *
from django.apps import apps

from .models import JobType
from .serializers import JobTypeSerializerList, JobTypeSerializer, JobTypeFrequencySerializer


class JobTypeListAPIView(generics.ListAPIView):
    queryset = JobType.objects.all()
    serializer_class = JobTypeSerializerList


class JobTypeDetailView(generics.RetrieveAPIView):
    queryset = JobType.objects.all()
    serializer_class = JobTypeSerializer


class JobFrequenciesListView(APIView):
    def post(self, request, *args, **kwargs):
        # Expecting a request body like: {"job_types": [1, 2, 3]}
        job_type_ids = request.data.get('job_types', [])
        if not isinstance(job_type_ids, list):
            return Response({'error': 'job_types should be a list'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch JobType objects and optimize query if needed
        job_types = JobType.objects.filter(id__in=job_type_ids).prefetch_related('jobfrequency_set')
        serializer = JobTypeFrequencySerializer(job_types, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@login_required
def model_documentation(request):
    """
    View to display documentation for all models in the price_configurations app.
    """
    # Get all models from the price_configurations app
    app_models = apps.get_app_config('price_configurations').get_models()
    
    # Create a list of model info including name and docstring
    model_info = []
    for model in app_models:
        model_info.append({
            'name': model.__name__,
            'docstring': model.__doc__.strip() if model.__doc__ else 'No documentation available',
            'fields': [field.name for field in model._meta.fields]
        })
    
    context = {
        'models': model_info
    }
    return render(request, 'price_configurations/documentation.html', context)
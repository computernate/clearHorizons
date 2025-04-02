from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

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
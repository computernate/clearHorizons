from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import *
from django.apps import apps

from .models import JobType, Employee, TimeBlock
from .serializers import (
    JobTypeSerializerList, JobTypeSerializer, JobTypeFrequencySerializer,
    EmployeeSerializer, EmployeeDetailSerializer, TimeBlockSerializer,
    DateAvailabilitySerializer, AvailableTimeSlotSerializer
)
from datetime import datetime, timedelta
from django.utils import timezone
import calendar


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


class EmployeeListAPIView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class EmployeeDetailAPIView(generics.RetrieveAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeDetailSerializer


class CheckAvailabilityView(APIView):
    def post(self, request, *args, **kwargs):
        date_str = request.data.get('date')
        job_type_id = request.data.get('job_type_id')
        
        if not date_str or not job_type_id:
            return Response(
                {'error': 'Both date and job_type_id are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            selected_date = datetime.strptime(date_str, '%Y-%m-%d').date()
            day_of_week = selected_date.weekday()  # 0 = Monday, 6 = Sunday
            
            # Get all employees who can perform this job type
            job_type = JobType.objects.get(id=job_type_id)
            employees = Employee.objects.filter(job_types=job_type)
            
            # Get all time blocks for these employees on this day of week
            time_blocks = TimeBlock.objects.filter(
                employee__in=employees,
                day_of_week=day_of_week
            ).order_by('start_time')
            
            # Group time blocks by time slots (hourly for simplicity)
            time_slots = {}
            for block in time_blocks:
                start_hour = block.start_time.hour
                end_hour = block.end_time.hour
                
                # For each hour in the time block
                for hour in range(start_hour, end_hour):
                    slot_time = datetime.strptime(f"{hour}:00", "%H:%M").time()
                    
                    if slot_time not in time_slots:
                        time_slots[slot_time] = []
                    
                    if block.employee not in time_slots[slot_time]:
                        time_slots[slot_time].append(block.employee)
            
            # Format the response
            available_slots = []
            for time_slot, available_employees in time_slots.items():
                slot_data = {
                    'time': time_slot,
                    'available_employees': EmployeeSerializer(available_employees, many=True).data
                }
                available_slots.append(slot_data)
            
            response_data = {
                'date': selected_date,
                'available_time_slots': available_slots
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
            
        except JobType.DoesNotExist:
            return Response(
                {'error': 'Job type not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except ValueError:
            return Response(
                {'error': 'Invalid date format. Use YYYY-MM-DD'}, 
                status=status.HTTP_400_BAD_REQUEST
            )


class MonthAvailabilityView(APIView):
    def post(self, request, *args, **kwargs):
        year = request.data.get('year')
        month = request.data.get('month')
        job_type_id = request.data.get('job_type_id')
        
        if not year or not month or not job_type_id:
            return Response(
                {'error': 'Year, month, and job_type_id are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            year = int(year)
            month = int(month)
            
            # Get the number of days in the month
            _, num_days = calendar.monthrange(year, month)
            
            # Get all employees who can perform this job type
            job_type = JobType.objects.get(id=job_type_id)
            employees = Employee.objects.filter(job_types=job_type)
            
            # Get all time blocks for these employees
            time_blocks = TimeBlock.objects.filter(employee__in=employees)
            
            # Check availability for each day of the month
            availability_data = []
            for day in range(1, num_days + 1):
                date = datetime(year, month, day).date()
                day_of_week = date.weekday()
                
                # Get time blocks for this day of week
                day_blocks = time_blocks.filter(day_of_week=day_of_week)
                
                # If there are time blocks for this day, it's available
                if day_blocks.exists():
                    availability_data.append({
                        'date': date,
                        'has_availability': True
                    })
                else:
                    availability_data.append({
                        'date': date,
                        'has_availability': False
                    })
            
            return Response({
                'year': year,
                'month': month,
                'job_type_id': job_type_id,
                'availability': availability_data
            }, status=status.HTTP_200_OK)
            
        except JobType.DoesNotExist:
            return Response(
                {'error': 'Job type not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except ValueError:
            return Response(
                {'error': 'Invalid year or month'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
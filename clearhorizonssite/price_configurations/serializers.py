from rest_framework import serializers
from .models import *


class JobTypeSerializerList(serializers.ModelSerializer):
    logo = serializers.ImageField(use_url=True)
    class Meta:
        model = JobType
        fields = ['id', 'name', 'logo']


class JobFrequencySerializerList(serializers.ModelSerializer):
    class Meta:
        model = JobFrequency
        fields = ['day_interval', 'display', 'discount']


class JobDataSelectOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobDataSelectOption
        fields = ['id', 'value', 'display']


class JobPriceOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPriceOption
        fields = ['id', 'time', 'job_level']


class JobDataSerializer(serializers.ModelSerializer):
    job_data_select_options = JobDataSelectOptionSerializer(many=True, read_only=True)
    job_price_options = JobPriceOptionSerializer(many=True, read_only=True)

    class Meta:
        model = JobData
        fields = ['id', 'name', 'type', 'internal_identifier', 'job_data_select_options', 'job_price_options', 'required', ]


class JobLevelSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobLevel
        fields = ['id', 'name', 'description', 'internal_identifier','bundle_discount']


class JobDataGroupSerializer(serializers.ModelSerializer):
    job_datas = JobDataSerializer(source='jobdata_set', many=True, read_only=True)

    class Meta:
        model = JobDataGroup
        fields = ['id', 'name', 'description', 'image', 'job_datas']


class JobTypeSerializer(serializers.ModelSerializer):
    job_levels = JobLevelSerializer(source='joblevel_set', many=True, read_only=True)
    job_data_groups = serializers.SerializerMethodField()

    class Meta:
        model = JobType
        fields = [
            'id', 'name', 'logo', 'inflation', 'base_pay', 'fixed_cost',
            'job_levels', 'job_data_groups'
        ]

    def get_job_data_groups(self, obj):
        # Retrieve all groups that have been explicitly defined for this JobType.
        groups = JobDataGroup.objects.filter(job_type=obj)
        groups_serializer = JobDataGroupSerializer(groups, many=True, context=self.context)
        groups_data = groups_serializer.data

        # Now find job_datas with no job_data_group (i.e. null)
        ungrouped_job_datas = JobData.objects.filter(job_type=obj, job_data_group__isnull=True)
        if ungrouped_job_datas.exists():
            ungrouped_serializer = JobDataSerializer(ungrouped_job_datas, many=True, context=self.context)
            # Create the default group with id 0 and blank fields
            default_group = {
                'id': 0,
                'name': '',
                'description': '',
                'image': '',
                'job_datas': ungrouped_serializer.data
            }
            groups_data.insert(0, default_group)

        return groups_data


class JobTypeFrequencySerializer(serializers.ModelSerializer):
    job_frequencies = JobFrequencySerializerList(many=True, source='jobfrequency_set')
    class Meta:
        model = JobType
        fields = [
            'id', 'name', 'logo', 'job_frequencies'
        ]


class TimeBlockSerializer(serializers.ModelSerializer):
    day_name = serializers.CharField(source='get_day_of_week_display', read_only=True)
    start_time_formatted = serializers.SerializerMethodField()
    end_time_formatted = serializers.SerializerMethodField()
    
    class Meta:
        model = TimeBlock
        fields = ['id', 'day_of_week', 'day_name', 'start_time', 'end_time', 'start_time_formatted', 'end_time_formatted']
    
    def get_start_time_formatted(self, obj):
        return obj.start_time.strftime('%I:%M %p')
    
    def get_end_time_formatted(self, obj):
        return obj.end_time.strftime('%I:%M %p')


class EmployeeSerializer(serializers.ModelSerializer):
    job_types = JobTypeSerializerList(many=True, read_only=True)
    
    class Meta:
        model = Employee
        fields = ['id', 'name', 'job_types']


class EmployeeDetailSerializer(serializers.ModelSerializer):
    job_types = JobTypeSerializerList(many=True, read_only=True)
    time_blocks = TimeBlockSerializer(many=True, read_only=True)
    
    class Meta:
        model = Employee
        fields = ['id', 'name', 'job_types', 'time_blocks']


class AvailableTimeSlotSerializer(serializers.Serializer):
    time = serializers.TimeField()
    available_employees = EmployeeSerializer(many=True)


class DateAvailabilitySerializer(serializers.Serializer):
    date = serializers.DateField()
    available_time_slots = AvailableTimeSlotSerializer(many=True)
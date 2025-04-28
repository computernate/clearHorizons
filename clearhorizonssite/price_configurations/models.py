from django.db import models

class JobType(models.Model):
    """
    This is the generic job type. This should be things like "Window" or "House" cleaning and will
    serve as the grouper for all information about that job type.
    """
    # Name as displayed to the user
    name = models.CharField(max_length=255, unique=True)
    # Logo is used both as the selection display and as the
    logo = models.ImageField(upload_to="jobtype_logos/", blank=True, null=True)
    # Inflation to raise every once in a while. Normally should be 1
    inflation = models.FloatField()
    # Base pay is how much per hour this job should cost. Times will be selected in job data
    base_pay = models.FloatField()
    # Cost for this service with 0 other options
    fixed_cost = models.FloatField()

    def __str__(self):
        return self.name

class JobLevel(models.Model):
    """
    Job levels are the different ways a job can be done. Good examples are "deep clean" vs "clean" or "interior & exterior."
    Think of this like selecting a price group.
    """
    job_type = models.ForeignKey(JobType, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    internal_identifier = models.CharField(max_length=255)
    bundle_discount = models.FloatField()
    def __str__(self):
        return self.name


class JobDataGroup(models.Model):
    """
    Groups together JobData fields in the user-facing form.
    If a JobData instance belongs to a group, it will appear within a collapsible section
    in the form. Otherwise, it will be displayed at the top level.
    """
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    image = models.ImageField(upload_to="extra_options/", blank=True, null=True)
    job_type = models.ForeignKey(JobType, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class JobData(models.Model):
    """
    Represents a piece of data to collect from the user in the job configuration form.
    This corresponds to a form field (e.g., text input, select dropdown, number input).
    """
    name = models.CharField(max_length=255)
    internal_identifier = models.CharField(max_length=255)
    placeholder = models.CharField(max_length=255, blank=True, null=True)
    required = models.BooleanField()
    type = models.CharField(max_length=50, choices=[('select', 'Select'), ('text', 'Text'), ('number', 'Number')])
    job_type = models.ForeignKey(JobType, on_delete=models.SET_NULL, null=True, blank=True)
    job_data_group = models.ForeignKey(JobDataGroup, on_delete=models.SET_NULL, null=True, blank=True)


    def __str__(self):
        return self.name

class JobPriceOption(models.Model):
    """
    Defines the estimated time (in hours) required for a specific job data option
    at a particular job level. This is used in calculating the total job duration and cost.
    """
    time = models.FloatField()
    job_level = models.ForeignKey(JobLevel, on_delete=models.CASCADE, related_name="job_price_options")
    job_data = models.ForeignKey(JobData, on_delete=models.CASCADE, related_name="job_price_options")

    def __str__(self):
        return f"{self.job_data} - {self.job_level}"

class JobDataSelectOption(models.Model):
    """
    Represents one possible choice for a JobData field of type 'select'.
    It holds the display text and the corresponding value (often used in calculations).
    """
    value = models.FloatField()
    display = models.CharField(max_length=255)
    job_data = models.ForeignKey(JobData, on_delete=models.CASCADE, related_name="job_data_select_options")

    def __str__(self):
        return self.display

class JobFrequency(models.Model):
    """
    Represents recurring job frequency options (e.g., weekly, monthly) that a user can select.
    It includes the time interval between jobs and any applicable discount for selecting
    that frequency.
    """
    day_interval = models.FloatField()
    display = models.CharField(max_length=255)
    discount = models.FloatField()
    job_type = models.ForeignKey(JobType, on_delete=models.SET_NULL, null=True, blank=True)
    def __str__(self):
        return self.display

class Employee(models.Model):
    """
    Represents an employee who can perform various job types.
    Each employee has a name and is associated with one or more job types they can perform.
    """
    name = models.CharField(max_length=255)
    job_types = models.ManyToManyField(JobType, related_name="employees")
    
    def __str__(self):
        return self.name

class TimeBlock(models.Model):
    """
    Represents a recurring time block when an employee is available to work.
    For example: Mondays from 2:00-4:00 PM or Tuesdays from 9:00 AM - 5:00 PM.
    """
    DAYS_OF_WEEK = [
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday'),
    ]
    
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="time_blocks")
    day_of_week = models.IntegerField(choices=DAYS_OF_WEEK)
    start_time = models.TimeField()
    end_time = models.TimeField()
    
    def __str__(self):
        return f"{self.employee.name} - {self.get_day_of_week_display()} {self.start_time.strftime('%I:%M %p')} - {self.end_time.strftime('%I:%M %p')}"
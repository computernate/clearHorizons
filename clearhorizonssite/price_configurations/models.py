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
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    image = models.ImageField(upload_to="extra_options/", blank=True, null=True)
    job_type = models.ForeignKey(JobType, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class JobData(models.Model):
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
    time = models.FloatField()
    job_level = models.ForeignKey(JobLevel, on_delete=models.CASCADE, related_name="job_price_options")
    job_data = models.ForeignKey(JobData, on_delete=models.CASCADE, related_name="job_price_options")

    def __str__(self):
        return f"{self.job_data} - {self.job_level}"

class JobDataSelectOption(models.Model):
    value = models.FloatField()
    display = models.CharField(max_length=255)
    job_data = models.ForeignKey(JobData, on_delete=models.CASCADE, related_name="job_data_select_options")

    def __str__(self):
        return self.display

class JobFrequency(models.Model):
    day_interval = models.FloatField()
    display = models.CharField(max_length=255)
    discount = models.FloatField()
    job_type = models.ForeignKey(JobType, on_delete=models.SET_NULL, null=True, blank=True)
    def __str__(self):
        return self.display
from django.db import models

# Create your models here.

class JobType(models.Model):
    name = models.CharField(max_length=255, unique=True)
    logo = models.ImageField(upload_to="jobtype_logos/", blank=True, null=True)
    inflation = models.FloatField()
    base_pay = models.FloatField()
    fixed_cost = models.FloatField()

    def __str__(self):
        return self.name

class ExtraOptionGroup(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="extra_options/", blank=True, null=True)
    job_type = models.ForeignKey(JobType, on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class JobData(models.Model):
    name = models.CharField(max_length=255)
    job_type = models.ForeignKey(JobType, on_delete=models.CASCADE, related_name="jobs")
    time = models.FloatField()
    deep_time = models.FloatField()
    extra_info = models.TextField(blank=True, null=True)
    extra_option_group = models.ForeignKey(ExtraOptionGroup, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

class JobDataOption(models.Model):
    name = models.CharField(max_length=255)
    job_data = models.ForeignKey(JobData, on_delete=models.CASCADE, related_name="options")

    def __str__(self):
        return self.name

class GeneralData(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=[('select', 'Select'), ('text', 'Text'), ('number', 'Number')])

    def __str__(self):
        return self.name

class GeneralDataOption(models.Model):
    name = models.CharField(max_length=255)
    value = models.FloatField()
    general_data = models.ForeignKey(GeneralData, on_delete=models.CASCADE, related_name="options")

    def __str__(self):
        return self.name

class DataAutomation(models.Model):
    condition = models.ForeignKey(GeneralData, on_delete=models.CASCADE, related_name="conditions")
    threshold = models.FloatField()
    output = models.ForeignKey(JobData, on_delete=models.CASCADE, related_name="automation_outputs")
    amount = models.FloatField()
    rate = models.FloatField()

    def __str__(self):
        return f"Automation - {self.condition} -> {self.output}"
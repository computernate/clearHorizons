from django.contrib import admin
from .models import *

# Register your models here.

# Inline Models (for nested admin views)
class ExtraOptionGroupInline(admin.TabularInline):
    model = ExtraOptionGroup
    extra = 1

class JobDataInline(admin.TabularInline):
    model = JobData
    extra = 1

class JobDataOptionInline(admin.TabularInline):
    model = JobDataOption
    extra = 1

class GeneralDataOptionInline(admin.TabularInline):
    model = GeneralDataOption
    extra = 1

# JobType Admin with ExtraOptionGroup and JobData Inlines
@admin.register(JobType)
class JobTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "base_pay", "inflation", "fixed_cost")
    search_fields = ("name",)
    inlines = [ExtraOptionGroupInline, JobDataInline]

# JobData Admin with JobDataOption Inline
@admin.register(JobData)
class JobDataAdmin(admin.ModelAdmin):
    list_display = ("name", "job_type", "time", "deep_time", "extra_option_group")
    search_fields = ("name", "job_type__name")
    list_filter = ("job_type",)
    inlines = [JobDataOptionInline]

# GeneralData Admin with GeneralDataOption Inline
@admin.register(GeneralData)
class GeneralDataAdmin(admin.ModelAdmin):
    list_display = ("name", "type")
    search_fields = ("name",)
    inlines = [GeneralDataOptionInline]

# DataAutomation Admin
@admin.register(DataAutomation)
class DataAutomationAdmin(admin.ModelAdmin):
    list_display = ("condition", "threshold", "output", "amount", "rate")
    search_fields = ("condition__name", "output__name")
    list_filter = ("condition",)
from django.contrib import admin
from .models import *

class JobLevelInline(admin.TabularInline):
    model = JobLevel
    extra = 0

class JobDataGroupInline(admin.TabularInline):
    model = JobDataGroup
    extra = 0

class JobDataInline(admin.TabularInline):
    model = JobData
    show_change_link = True
    extra = 0

class JobPriceOptionInline(admin.TabularInline):
    model = JobPriceOption
    extra = 0

class JobDataSelectOptionInline(admin.TabularInline):
    model = JobDataSelectOption
    extra = 0

class JobFrequencyInline(admin.TabularInline):
    model = JobFrequency
    extra = 0

@admin.register(JobType)
class JobTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "base_pay", "inflation", "fixed_cost")
    search_fields = ("name",)
    inlines = [JobLevelInline, JobDataGroupInline, JobDataInline, JobFrequencyInline]

@admin.register(JobLevel)
class JobLevelAdmin(admin.ModelAdmin):
    list_display = ("name", "job_type", "bundle_discount")
    search_fields = ("name", "job_type__name")
    list_filter = ("job_type",)

@admin.register(JobDataGroup)
class JobDataGroupAdmin(admin.ModelAdmin):
    list_display = ("name", "job_type")
    search_fields = ("name", "job_type__name")
    list_filter = ("job_type",)
    inlines = [JobDataInline]

@admin.register(JobData)
class JobDataAdmin(admin.ModelAdmin):
    list_display = ("name", "job_data_group", "type", "required")
    search_fields = ("name", "job_data_group__name")
    list_filter = ("job_data_group", "type", "required")
    inlines = [JobPriceOptionInline, JobDataSelectOptionInline]

@admin.register(JobPriceOption)
class JobPriceOptionAdmin(admin.ModelAdmin):
    list_display = ("job_data", "job_level", "time")
    search_fields = ("job_data__name", "job_level__name")
    list_filter = ("job_level",)

@admin.register(JobDataSelectOption)
class JobDataSelectOptionAdmin(admin.ModelAdmin):
    list_display = ("job_data", "display", "value")
    search_fields = ("display", "job_data__name")
    list_filter = ("job_data",)

@admin.register(JobFrequency)
class JobFrequencyAdmin(admin.ModelAdmin):
    list_display = ("display", "day_interval", "discount", "job_type")
    search_fields = ("display", "job_type__name")
    list_filter = ("job_type",)
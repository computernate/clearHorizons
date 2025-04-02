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

# JobType Admin with ExtraOptionGroup and JobData Inlines
@admin.register(JobType)
class JobTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "base_pay", "inflation", "fixed_cost")
    search_fields = ("name",)
    inlines = [JobLevelInline, JobDataGroupInline, JobDataInline, JobFrequencyInline]


# JobData Admin with JobDataOption Inline
@admin.register(JobData)
class JobDataAdmin(admin.ModelAdmin):
    list_display = ("name", "job_data_group")
    search_fields = ("name", "job_data_group__name")
    list_filter = ("job_data_group",)
    inlines = [JobPriceOptionInline, JobDataSelectOptionInline]
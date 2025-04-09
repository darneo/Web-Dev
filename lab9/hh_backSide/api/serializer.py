from rest_framework import serializers
from .models import Company, Vacancy, Application

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields =  ['id', 'name', 'description', 'city', 'address']

class VacancySerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)  # Добавляем имя компании

    class Meta:
        model = Vacancy
        fields = ['id', 'name', 'description', 'salary', 'company', 'company_name']


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'name', 'email', 'vacancy', 'created_at']
        read_only_fields = ['created_at']

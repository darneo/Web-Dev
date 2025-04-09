from rest_framework import serializers
from .models import Company, Vacancy, Application

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields =  ['id', 'name', 'description', 'city', 'address']

class VacancySerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = Vacancy
        fields = ['id', 'name', 'description', 'salary', 'company', 'company_name']


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'name', 'email', 'vacancy', 'created_at']
        read_only_fields = ['created_at']
from rest_framework import serializers

class CompanySerializer2(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    description = serializers.CharField(allow_blank=True, required=False)
    city = serializers.CharField(max_length=100)
    address = serializers.CharField(max_length=255)



class VacancySerializer2(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    description = serializers.CharField()
    salary = serializers.FloatField()
    company = serializers.IntegerField()
    company_name = serializers.CharField(read_only=True)

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['company_name'] = getattr(instance.company, 'name', '') if hasattr(instance, 'company') else ''
        return rep


# Application
class ApplicationSerializer2(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    vacancy = serializers.IntegerField()
    created_at = serializers.DateTimeField(read_only=True)

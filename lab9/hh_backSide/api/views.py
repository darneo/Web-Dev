import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Company, Vacancy
from .serializer import CompanySerializer, VacancySerializer

@csrf_exempt
def company_list(request):
    if request.method == 'GET':
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            serializer = CompanySerializer(data=data)
            if serializer.is_valid():
                company = serializer.save()
                return JsonResponse(serializer.data, status=201)
            return JsonResponse(serializer.errors, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)})

@csrf_exempt
def company_detail(request, company_id):
    try:
        company = Company.objects.get(id=company_id)
    except Company.DoesNotExist as e:
        return JsonResponse({"error": str(e)}, status=404)

    if request.method == 'GET':
        serializer = CompanySerializer(company)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'PUT':
        new_data = json.loads(request.body)
        serializer = CompanySerializer(company, data=new_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        company.delete()
        return JsonResponse({"message": 'Company deleted'}, status=204)

def company_vacancies(request, company_id):
    try:
        company = Company.objects.get(id=company_id)
    except Company.DoesNotExist as e:
        return JsonResponse({"error": str(e)}, status=404)
    vacancies = company.vacancies.all()
    serializer = VacancySerializer(vacancies, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def vacancy_list(request):
    if request.method == 'GET':
        vacancies = Vacancy.objects.all()
        serializer = VacancySerializer(vacancies, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            company_name = data.get('company')

            if not company_name:
                return JsonResponse({"error": "company_name is required"}, status=400)
            try:
                company = Company.objects.get(name=company_name)
            except Company.DoesNotExist:
                company = Company.objects.create(
                    name=company_name,
                    description=data.get('company_description', ''),
                    city=data.get('company_city', ''),
                    address=data.get('company_address', '')
                )

            data['company'] = company.id
            serializer = VacancySerializer(data=data)
            if serializer.is_valid():
                vacancy = serializer.save()
                return JsonResponse(serializer.data, status=201)
            return JsonResponse(serializer.errors, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
def vacancy_detail(request, vacancy_id):
    try:
        vacancy = Vacancy.objects.get(id=vacancy_id)
    except Vacancy.DoesNotExist as e:
        return JsonResponse({"error": str(e)}, status=404)

    if request.method == 'GET':
        serializer = VacancySerializer(vacancy)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        new_data = json.loads(request.body)
        serializer = VacancySerializer(vacancy, data=new_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        vacancy.delete()
        return JsonResponse({"message": 'Vacancy deleted'}, status=204)

def top_ten_vacancies(request):
    vacancies = Vacancy.objects.order_by('-salary')[:10]
    serializer = VacancySerializer(vacancies, many=True)
    return JsonResponse(serializer.data, safe=False)

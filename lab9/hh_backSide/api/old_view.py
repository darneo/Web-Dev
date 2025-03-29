import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Company, Vacancy
from .serializer import CompanySerializer


@csrf_exempt
def company_list(request):
    if request.method == 'GET':
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            company = Company.objects.create(
                name=data['name'],
                city=data['city'],
                address=data['address'],
                description=data['description']
            )
        except Exception as e:
            return JsonResponse({"error": str(e)})

        return JsonResponse(company.to_json(), status=201)

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
        company.name = new_data['name']
        company.city = new_data['city']
        company.address = new_data['address']
        company.description = new_data['description']

        company.save()
        return JsonResponse(company.to_json(), status=200)
    elif request.method == 'DELETE':
        company.delete()
        return JsonResponse({"message": 'Company deleted'}, status=204)

def company_vacancies(request, company_id):
    try:
        company = Company.objects.get(id=company_id)
    except Company.DoesNotExist as e:
        return JsonResponse({"error": str(e)}, status=404)
    vacancies = company.vacancies.all()
    return JsonResponse([vacancy.to_json() for vacancy in vacancies], safe=False)

@csrf_exempt
def vacancy_list(request):
    if request.method == 'GET':
        vacancies = Vacancy.objects.all()
        return JsonResponse([vacancy.to_json() for vacancy in vacancies], safe=False)

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

            vacancy = Vacancy.objects.create(
                name=data['name'],
                description=data.get('description', ''),
                salary=data['salary'],
                company=company
            )
            print(vacancy.to_json())

            return JsonResponse(vacancy.to_json(), status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
@csrf_exempt
def vacancy_detail(request, vacancy_id):
    try:
        vacancy = Vacancy.objects.get(id=vacancy_id)
    except Vacancy.DoesNotExist as e:
        return JsonResponse({"error": str(e)}, status=404)

    if request.method == 'GET':
        return JsonResponse(vacancy.to_json())
    elif request.method == 'PUT':
        new_data = json.loads(request.body)
        vacancy.name = new_data['name']
        vacancy.description = new_data['description']
        vacancy.salary = new_data['salary']

        vacancy.save()
        return JsonResponse(vacancy.to_json(), status=200)
    elif request.method == 'DELETE':
        vacancy.delete()
        return JsonResponse({"message": 'Vacancy deleted'}, status=204)

def top_ten_vacancies(request):
    vacancies = Vacancy.objects.order_by('-salary')[:10]
    return JsonResponse([vacancy.to_json() for vacancy in vacancies], safe=False)

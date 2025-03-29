from django.urls import path
from api import views
urlpatterns = [
    path('companies/', views.company_list, name='company-list'),
    path('companies/<int:company_id>/',views.company_detail, name='company-detail'),
    path('companies/<int:company_id>/vacancies/',   views.company_vacancies, name='company-vacancies'),
    path('vacancies/', views.vacancy_list, name='vacancy-list'),
    path('vacancies/<int:vacancy_id>/', views.vacancy_detail, name='vacancy-detail'),
    path('vacancies/top_ten/', views.top_ten_vacancies, name='top-ten-vacancies'),
]
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { CommonModule } from '@angular/common';
import { Company, Vacancy } from '../../models';

@Component({
  selector: 'app-company-detail',
  imports: [RouterModule, CommonModule],
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  company!: Company;
  vacancies : Vacancy[] = [];

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    const companyId = +this.route.snapshot.paramMap.get('companyId')!;
    this.companyService.getCompanyById(companyId).subscribe(data => {
      this.company = data;
    });
    this.companyService.getCompanyById(companyId).subscribe(data => {
      this.company = data;
    });
    this.companyService.getVacanciesByCompany(companyId).subscribe(data => {
      this.vacancies = data;
    });
  }
}

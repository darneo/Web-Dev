import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { CommonModule } from '@angular/common';
import { Company } from '../../models';

@Component({
  selector: 'app-company-list',
  imports:[CommonModule, RouterModule],
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];

  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
    });
  }

  goToCompanyDetail(companyId: number): void {
    this.router.navigate([`/companies/${companyId}`]);
  }
}

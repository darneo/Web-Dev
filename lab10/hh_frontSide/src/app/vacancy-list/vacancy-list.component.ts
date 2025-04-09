import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { VacancyService } from '../services/vacancy.service';
import { CommonModule } from '@angular/common';
import { Vacancy } from '../../models';

@Component({
  selector: 'app-vacancy-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})
export class VacancyListComponent implements OnInit {
  vacancies: Vacancy[] = [];

  constructor(private vacancyService: VacancyService, private router: Router) {}

  ngOnInit(): void {
    this.vacancyService.getVacancies().subscribe(data => {
      this.vacancies = data;
    });
  }

  goToVacancyDetail(vacancyId: number): void {
    this.router.navigate([`/vacancies/${vacancyId}`]);
  }
}

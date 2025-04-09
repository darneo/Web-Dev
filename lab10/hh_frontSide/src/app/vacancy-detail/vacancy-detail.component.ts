import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VacancyService } from '../services/vacancy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacancy-detail',
  imports:[RouterModule, CommonModule],
  templateUrl: './vacancy-detail.component.html',
  styleUrls: ['./vacancy-detail.component.css']
})
export class VacancyDetailComponent implements OnInit {
  vacancy: any = {};

  constructor(
    private route: ActivatedRoute,
    private vacancyService: VacancyService
  ) {}

  ngOnInit(): void {
    const vacancyId = +this.route.snapshot.paramMap.get('vacancyId')!;
    this.vacancyService.getVacancyById(vacancyId).subscribe(data => {
      this.vacancy = data;
    });
  }
}

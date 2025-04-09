import { Routes } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { VacancyListComponent } from './vacancy-list/vacancy-list.component';
import { VacancyDetailComponent } from './vacancy-detail/vacancy-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

export const routes: Routes = [
  { path: 'companies', component: CompanyListComponent,},
  { path: 'companies/:companyId', component: CompanyDetailComponent },
  { path: 'vacancies', component: VacancyListComponent,},
  { path: 'vacancies/:vacancyId', component: VacancyDetailComponent },
  { path: '', redirectTo: '/companies', pathMatch: 'full' }, 
];
;
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
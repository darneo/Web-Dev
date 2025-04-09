import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CompanyListComponent } from "./company-list/company-list.component";

@Component({
  selector: 'app-root',
  imports: [ RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hh_frontSide';
}

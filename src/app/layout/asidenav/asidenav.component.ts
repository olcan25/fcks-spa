import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { Company } from 'src/app/core/models/company.model';
import { CompanyService } from 'src/app/core/services/api-services/company/company.service';
import { OpenWeatherMapService } from 'src/app/core/services/api-services/weather/open-weather-map.service';

@Component({
  selector: 'app-asidenav',
  templateUrl: './asidenav.component.html',
  styleUrls: ['./asidenav.component.css'],
})
export class AsidenavComponent implements OnInit {
  companies: Company[] = [];
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadAllCompanies();
  }

  loadAllCompanies() {
    this.companyService
      .getAll()
      .subscribe((response) => (this.companies = response.data));
  }
}

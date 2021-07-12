import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { ResponseModel } from 'src/app/core/models/base-model/respnse-model.model';
import { SingleResponseModel } from 'src/app/core/models/base-model/single-response-model.model';
import { Company } from 'src/app/core/models/company.model';
import { GetDtoCompany } from 'src/app/core/models/company/get-dto-company.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends CrudService<Company, number> {
  constructor(private http: HttpClient) {
    super(http, `companies`);
  }

  getAllDtoCompanies(): Observable<ListResponseModel<GetDtoCompany>> {
    return this.http.get<ListResponseModel<GetDtoCompany>>(this.apiUrl);
  }

  getFirstCompany(): Observable<SingleResponseModel<Company>> {
    return this.http.get<SingleResponseModel<Company>>(this.apiUrl + '/first');
  }

  getByIdDtoCompany(
    id: number
  ): Observable<SingleResponseModel<GetDtoCompany>> {
    return this.http.get<SingleResponseModel<GetDtoCompany>>(
      this.apiUrl + '/id/' + id
    );
  }

  addImage(formData: FormData): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.apiUrl, formData);
  }
}

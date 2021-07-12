import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { SingleResponseModel } from 'src/app/core/models/base-model/single-response-model.model';
import { CompanyBankAccount } from 'src/app/core/models/company-bank-account/company-bank-account.model';
import { GetDtoCompanyBankAccount } from 'src/app/core/models/company-bank-account/getDtoCompanyBankAccount';
import { environment } from 'src/environments/environment';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyBankAccountService extends CrudService<
  CompanyBankAccount,
  number
> {
  constructor(private http: HttpClient) {
    super(http, `companybankaccounts`);
  }

  getAllWithCompanyBank(): Observable<
    ListResponseModel<GetDtoCompanyBankAccount>
  > {
    return this.http.get<ListResponseModel<GetDtoCompanyBankAccount>>(
      this.apiUrl
    );
  }

  getByIdWithCompanyBank(
    id: number
  ): Observable<SingleResponseModel<GetDtoCompanyBankAccount>> {
    return this.http.get<SingleResponseModel<GetDtoCompanyBankAccount>>(
      this.apiUrl + '/id/' + id
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { SingleResponseModel } from 'src/app/core/models/base-model/single-response-model.model';
import { GetDtoPartnerBankAccount } from 'src/app/core/models/partner-bank-account/get-dto-partner-bank-account';
import { PartnerBankAccount } from 'src/app/core/models/partner-bank-account/partner-bank-account.model';
import { PartnerByIdBankAccount } from 'src/app/core/models/partner-bank-account/partnerById-bank-account';
import { environment } from 'src/environments/environment';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class PartnerBankAccountService extends CrudService<
  PartnerBankAccount,
  number
> {
  constructor(private http: HttpClient) {
    super(http, `partnerbankaccounts`);
  }

  getAllDtoPartnerBankAccounts(): Observable<
    ListResponseModel<GetDtoPartnerBankAccount>
  > {
    return this.http.get<ListResponseModel<GetDtoPartnerBankAccount>>(
      this.apiUrl
    );
  }

  getByIdDtoPartnerBankAccount(
    id: number
  ): Observable<ListResponseModel<GetDtoPartnerBankAccount>> {
    return this.http.get<ListResponseModel<GetDtoPartnerBankAccount>>(
      `${this.apiUrl}/id/${id}`
    );
  }

  getByPartnerIdDtoPartnerBankAccounts(
    partnerId: number
  ): Observable<ListResponseModel<PartnerByIdBankAccount>> {
    return this.http.get<ListResponseModel<PartnerByIdBankAccount>>(
      `${this.apiUrl}/partnerId/${partnerId}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Account } from './../../../models/account/account.model';
import { Injectable } from '@angular/core';
import { CrudService } from '../base/crud.service';
import { GetAccountDto } from 'src/app/core/models/account/account-dto.model';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { SingleResponseModel } from 'src/app/core/models/base-model/single-response-model.model';
import { DtoCardOfAccount } from 'src/app/core/models/account/card-of-account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService extends CrudService<Account, string> {
  constructor(private http: HttpClient) {
    super(http, 'accounts');
  }

  getAllListDtoAccounts(): Observable<ListResponseModel<GetAccountDto>> {
    return this.http.get<ListResponseModel<GetAccountDto>>(this.apiUrl);
  }

  getAllDtoAccount(id: number): Observable<SingleResponseModel<GetAccountDto>> {
    return this.http.get<SingleResponseModel<GetAccountDto>>(
      this.apiUrl + '/' + id
    );
  }
}

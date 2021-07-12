import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountType } from 'src/app/core/models/account/account-type.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class AccountTypeService extends CrudService<AccountType, number> {
  constructor(private http: HttpClient) {
    super(http, 'accountTypes');
  }
}

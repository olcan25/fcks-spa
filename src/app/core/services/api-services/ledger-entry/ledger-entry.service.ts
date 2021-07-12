import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { ResponseModel } from 'src/app/core/models/base-model/respnse-model.model';
import { LedgerAccountModel } from 'src/app/core/models/ledger-entry/ledger-account-model.model';
import { LedgerAccountDto } from 'src/app/core/models/ledger-entry/ledger-account.model';
import { LedgerEntry } from 'src/app/core/models/ledger-entry/ledger-entry.model';
import { Ledger } from 'src/app/core/models/ledger.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class LedgerEntryService extends CrudService<LedgerEntry, number> {
  constructor(private http: HttpClient) {
    super(http, 'ledgeraccounts');
  }

  getAllLedgerAccountsDto(): Observable<ListResponseModel<LedgerAccountDto>> {
    return this.http.get<ListResponseModel<LedgerAccountDto>>(this.apiUrl);
  }

  getAllLedgerAccountsDtoBetweenDate(
    startDate: any,
    endDate: any
  ): Observable<ListResponseModel<LedgerAccountDto>> {
    return this.http.post<ListResponseModel<LedgerAccountDto>>(
      this.apiUrl + '/betweenDate',
      {
        startDate: startDate,
        endDate: endDate,
      }
    );
  }

  bulkAdd(LedgerAccountModel: LedgerAccountModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.apiUrl, LedgerAccountModel);
  }

  bulkDelete(id: number): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(this.apiUrl + '/' + id);
  }

  getByLedgerIdListLedgerEntries(
    ledgerId: number
  ): Observable<ListResponseModel<LedgerEntry>> {
    return this.http.get<ListResponseModel<LedgerEntry>>(
      this.apiUrl + '/ledgerentries/' + ledgerId
    );
  }
}

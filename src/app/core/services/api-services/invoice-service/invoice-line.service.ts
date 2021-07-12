import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { InvoiceLine } from 'src/app/core/models/invoice/invoice-line.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceLineService extends CrudService<InvoiceLine, number> {
  constructor(private http: HttpClient) {
    super(http, 'invoicelines');
  }

  getByIdInvoiceLines(
    wholeSaleOrderId: number
  ): Observable<ListResponseModel<InvoiceLine>> {
    return this.http.get<ListResponseModel<InvoiceLine>>(
      this.apiUrl + '/id/' + wholeSaleOrderId
    );
  }
}

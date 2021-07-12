import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { PurchaseOrderLine } from 'src/app/core/models/purchase-order/pruchase-order-line.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderLineService extends CrudService<
  PurchaseOrderLine,
  number
> {
  constructor(private http: HttpClient) {
    super(http, 'purchaseorderlines');
  }

  getByPurchaseOrderId(
    purchaseOrderId: number
  ): Observable<ListResponseModel<PurchaseOrderLine>> {
    return this.http.get<ListResponseModel<PurchaseOrderLine>>(
      this.apiUrl + '/purchaseorderid/' + purchaseOrderId
    );
  }
}

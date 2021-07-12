import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'jquery';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { SingleResponseModel } from 'src/app/core/models/base-model/single-response-model.model';
import { GetPurchaseOrderDto } from 'src/app/core/models/purchase-order/get-purchase-order-dto.model';
import { PurchaseOrderModel } from 'src/app/core/models/purchase-order/purchase-order-model.model';
import { PurchaseOrder } from 'src/app/core/models/purchase-order/purchase-order.model';

import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService extends CrudService<PurchaseOrder, number> {
  constructor(private http: HttpClient) {
    super(http, `purchaseorders`);
  }
  getAllPurchaseOrderDtos(): Observable<
    ListResponseModel<GetPurchaseOrderDto>
  > {
    return this.http.get<ListResponseModel<GetPurchaseOrderDto>>(this.apiUrl);
  }

  getByIdPurchaseOrderDto(
    id: number
  ): Observable<SingleResponseModel<GetPurchaseOrderDto>> {
    return this.http.get<SingleResponseModel<GetPurchaseOrderDto>>(
      this.apiUrl + '/detail/' + id
    );
  }

  getByLedgerIdPurchaseOrder(
    ledgerId: number
  ): Observable<SingleResponseModel<PurchaseOrder>> {
    return this.http.get<SingleResponseModel<PurchaseOrder>>(
      this.apiUrl + '/ledgerId/' + ledgerId
    );
  }
}

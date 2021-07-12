import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { WholeSaleOrderLine } from 'src/app/core/models/whole-sale-order/whole-sale-order-line.model';
import { WholeSaleOrder } from 'src/app/core/models/whole-sale-order/whole-sale-order.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class WholeSaleOrderLineService extends CrudService<
  WholeSaleOrderLine,
  number
> {
  constructor(private http: HttpClient) {
    super(http, 'wholesaleorderlines');
  }

  getByWholeSaleOrderId(
    wholeSaleOrderId: number
  ): Observable<ListResponseModel<WholeSaleOrderLine>> {
    return this.http.get<ListResponseModel<WholeSaleOrderLine>>(
      this.apiUrl + '/wholesaleorderid/' + wholeSaleOrderId
    );
  }
}

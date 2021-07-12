import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { SingleResponseModel } from 'src/app/core/models/base-model/single-response-model.model';
import { GetWholeSaleOrderDto } from 'src/app/core/models/whole-sale-order/whole-sale-order-dto.model';
import { WholeSaleOrder } from 'src/app/core/models/whole-sale-order/whole-sale-order.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class WholeSaleOrderService extends CrudService<WholeSaleOrder, number> {
  constructor(private http: HttpClient) {
    super(http, 'wholesaleorders');
  }

  getAllWholeSaleOrdersDto(): Observable<
    ListResponseModel<GetWholeSaleOrderDto>
  > {
    return this.http.get<ListResponseModel<GetWholeSaleOrderDto>>(this.apiUrl);
  }

  getByIdWholeSaleOrderDto(
    id: number
  ): Observable<SingleResponseModel<GetWholeSaleOrderDto>> {
    return this.http.get<SingleResponseModel<GetWholeSaleOrderDto>>(
      this.apiUrl + '/detail/' + id
    );
  }

  getByLedgerIdWholeSaleOrder(
    ledgerId: number
  ): Observable<SingleResponseModel<WholeSaleOrder>> {
    return this.http.get<SingleResponseModel<WholeSaleOrder>>(
      this.apiUrl + '/ledgerId/' + ledgerId
    );
  }
}

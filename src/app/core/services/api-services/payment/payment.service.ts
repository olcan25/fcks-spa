import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { SingleResponseModel } from 'src/app/core/models/base-model/single-response-model.model';
import { GetPaymentDto } from 'src/app/core/models/payments/payment-dto.model';
import { PaymentModel } from 'src/app/core/models/payments/payment-model.model';
import { Payment } from 'src/app/core/models/payments/payment.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends CrudService<PaymentModel, number> {
  constructor(private http: HttpClient) {
    super(http, 'payments');
  }

  getAllPaymentDtoJoin(): Observable<ListResponseModel<GetPaymentDto>> {
    return this.http.get<ListResponseModel<GetPaymentDto>>(this.apiUrl);
  }

  getByDetailPaymentDtoJoin(
    id: number
  ): Observable<SingleResponseModel<GetPaymentDto>> {
    return this.http.get<SingleResponseModel<GetPaymentDto>>(
      this.apiUrl + '/id/' + id
    );
  }

  getByLedgerIdPayment(
    ledgerId: number
  ): Observable<SingleResponseModel<Payment>> {
    return this.http.get<SingleResponseModel<Payment>>(
      this.apiUrl + '/ledgerid/' + ledgerId
    );
  }
}

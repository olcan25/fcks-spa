import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentType } from 'src/app/core/models/payments/payment-type.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService extends CrudService<PaymentType,number> {

  constructor(private http:HttpClient) {
    super(http,'paymenttypes')
   }
}

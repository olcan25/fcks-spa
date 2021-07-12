import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WholeSaleOrderModel } from 'src/app/core/models/whole-sale-order/whole-sale-order-model.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root'
})
export class TallyOutService extends CrudService<WholeSaleOrderModel,number> {

  constructor(private http:HttpClient) {
    super(http,'tallyouts')
   }
}

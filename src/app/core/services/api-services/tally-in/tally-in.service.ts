import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseOrderModel } from 'src/app/core/models/purchase-order/purchase-order-model.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root'
})
export class TallyInService extends CrudService<PurchaseOrderModel,number> {

  constructor(private http:HttpClient) {
    super(http,'tallyins')
   }
}

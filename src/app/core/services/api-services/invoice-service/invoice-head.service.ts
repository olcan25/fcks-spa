import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceHead } from 'src/app/core/models/invoice/invoice-head.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceHeadService extends CrudService<InvoiceHead,number> {

  constructor(private http:HttpClient) {
    super(http,'invoiceheads')
   }
}

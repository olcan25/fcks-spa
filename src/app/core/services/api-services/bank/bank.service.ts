import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bank } from '../../../models/bank.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root'
})
export class BankService extends CrudService<Bank,number> {

  constructor(private http:HttpClient) {
    super(http,`banks`)
   }
}

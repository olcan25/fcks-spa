import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vat } from 'src/app/core/models/vat.model';
import { environment } from 'src/environments/environment';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root'
})
export class VatService extends CrudService<Vat,number> {

  constructor(private http:HttpClient) {
    super(http,`vats`)
   }
}

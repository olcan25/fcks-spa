import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partner } from 'src/app/core/models/partner.model';
import { DtoConditionOfPartner } from 'src/app/core/models/partner/condition-of-parner.model';
import { environment } from 'src/environments/environment';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerService extends CrudService<Partner,number> {

  constructor(private http:HttpClient) {
    super(http,`partners`)
   }
}

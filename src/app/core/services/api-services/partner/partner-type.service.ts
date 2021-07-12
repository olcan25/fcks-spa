import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PartnerType } from 'src/app/core/models/partner/partner-type.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerTypeService extends CrudService<PartnerType,number> {

  constructor(private http:HttpClient) {
    super(http,'partnertypes')
   }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyImage } from 'src/app/core/models/company/company-image.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyImageService extends CrudService<CompanyImage,number> {

  constructor(private http:HttpClient) {
    super(http,'companyimages')
   }
}

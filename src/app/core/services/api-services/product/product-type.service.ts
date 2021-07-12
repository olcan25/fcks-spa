import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductType } from 'src/app/core/models/product/product-type.mode';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService extends CrudService<ProductType,number> {

  constructor(private http:HttpClient) {
    super(http,'producttypes')
   }
}

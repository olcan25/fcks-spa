import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnitOfMeasure } from 'src/app/core/models/unit-of-measure.model';
import { environment } from 'src/environments/environment';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root'
})
export class UnitOfMeasureService extends CrudService<UnitOfMeasure,number> {

  constructor(private http:HttpClient) {
    super(http,`unitofmeasures`)
   }
}

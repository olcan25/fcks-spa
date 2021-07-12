import { DtoWarehouse } from './../../../models/warehouse/dto-warehouse.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { Warehouse } from 'src/app/core/models/warehouse/warehouse.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService extends CrudService<Warehouse, number> {
  constructor(private http: HttpClient) {
    super(http, 'warehouses');
  }

  getByCompanyIdWarehouses(
    companyId: number
  ): Observable<ListResponseModel<Warehouse>> {
    return this.http.get<ListResponseModel<Warehouse>>(
      this.apiUrl + '/companyId/' + companyId
    );
  }

  getAllDtoWarehouses(): Observable<ListResponseModel<DtoWarehouse>> {
    return this.http.get<ListResponseModel<DtoWarehouse>>(this.apiUrl);
  }
}

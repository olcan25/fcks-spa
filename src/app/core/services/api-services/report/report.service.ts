import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DtoCardOfAccount } from 'src/app/core/models/account/card-of-account.model';
import { DtoConditionOfAccount } from 'src/app/core/models/account/condition-of-account.model';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { DtoCardOfPartner } from 'src/app/core/models/partner/card-of-partner.model';
import { DtoConditionOfPartner } from 'src/app/core/models/partner/condition-of-parner.model';
import { DtoCardOfProduct } from 'src/app/core/models/product/card-of-product.model';
import { DtoConditionOfProduct } from 'src/app/core/models/product/condition-of-product.model';
import { environment } from 'src/environments/environment';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  apiUrl: string = environment.baseUrl + 'reports';

  constructor(private http: HttpClient) {}

  getAllConditionOfProducts(): Observable<
    ListResponseModel<DtoConditionOfProduct>
  > {
    return this.http.get<ListResponseModel<DtoConditionOfProduct>>(
      this.apiUrl + '/conditionofproducts'
    );
  }

  getAllConditionOfProductsBetweenDate(
    starDate: any,
    endDate: any
  ): Observable<ListResponseModel<DtoConditionOfProduct>> {
    return this.http.post<ListResponseModel<DtoConditionOfProduct>>(
      this.apiUrl + '/conditionofproducts',
      { startDate: starDate, endDate: endDate }
    );
  }

  getByPartnerIdCardOfPartnersPost(
    partnerId: number,
    starDate: any,
    endDate: any
  ): Observable<ListResponseModel<DtoCardOfPartner>> {
    return this.http.post<ListResponseModel<DtoCardOfPartner>>(
      this.apiUrl + '/cardofpartners/' + partnerId,
      { startDate: starDate, endDate: endDate }
    );
  }

  getByPartnerIdCardOfPartners(
    partnerId: number
  ): Observable<ListResponseModel<DtoCardOfPartner>> {
    return this.http.get<ListResponseModel<DtoCardOfPartner>>(
      this.apiUrl + '/cardofpartners/' + partnerId
    );
  }

  getByProductIdCardOfProducts(
    productId: number
  ): Observable<ListResponseModel<DtoCardOfProduct>> {
    return this.http.get<ListResponseModel<DtoCardOfProduct>>(
      this.apiUrl + '/cardofproducts/' + productId
    );
  }

  getByProductIdCardOfProductsPost(
    productId: number,
    starDate: any,
    endDate: any
  ): Observable<ListResponseModel<DtoCardOfProduct>> {
    return this.http.post<ListResponseModel<DtoCardOfProduct>>(
      this.apiUrl + '/cardofproducts/' + productId,
      { starDate: starDate, endDate: endDate }
    );
  }

  getAllConditionOfPartners(): Observable<
    ListResponseModel<DtoConditionOfPartner>
  > {
    return this.http.get<ListResponseModel<DtoConditionOfPartner>>(
      this.apiUrl + '/conditionofpartners'
    );
  }

  getAllConditionOfPartnersBetweenDate(
    starDate: any,
    endDate: any
  ): Observable<ListResponseModel<DtoConditionOfPartner>> {
    return this.http.post<ListResponseModel<DtoConditionOfPartner>>(
      this.apiUrl + '/conditionofpartners',
      { startDate: starDate, endDate: endDate }
    );
  }

  getAllConditionOfAccounts(): Observable<
    ListResponseModel<DtoConditionOfAccount>
  > {
    return this.http.get<ListResponseModel<DtoConditionOfAccount>>(
      this.apiUrl + '/conditionofaccounts'
    );
  }

  getAllConditionOfAccountsBetweenDate(
    starDate: any,
    endDate: any
  ): Observable<ListResponseModel<DtoConditionOfAccount>> {
    return this.http.post<ListResponseModel<DtoConditionOfAccount>>(
      this.apiUrl + '/conditionofaccounts',
      { startDate: starDate, endDate: endDate }
    );
  }

  getByAccountIdListCardOfAccounts(
    accountId: string
  ): Observable<ListResponseModel<DtoCardOfAccount>> {
    return this.http.get<ListResponseModel<DtoCardOfAccount>>(
      this.apiUrl + '/cardofaccounts/' + accountId
    );
  }

  getByAccountIdListCardOfAccountsPost(
    accountId: string,
    starDate: any,
    endDate: any
  ): Observable<ListResponseModel<DtoCardOfAccount>> {
    return this.http.post<ListResponseModel<DtoCardOfAccount>>(
      this.apiUrl + '/cardofaccounts/' + accountId,
      { startDate: starDate, endDate: endDate }
    );
  }
}

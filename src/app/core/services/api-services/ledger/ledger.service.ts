import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { SingleResponseModel } from 'src/app/core/models/base-model/single-response-model.model';
import { CompareDate } from 'src/app/core/models/compare-date.model';
import { Ledger } from 'src/app/core/models/ledger.model';
import { PurchaseOrderLine } from 'src/app/core/models/purchase-order/pruchase-order-line.model';
import { PurchaseOrderModel } from 'src/app/core/models/purchase-order/purchase-order-model.model';
import { PurchaseOrder } from 'src/app/core/models/purchase-order/purchase-order.model';
import { WholeSaleOrderModel } from 'src/app/core/models/whole-sale-order/whole-sale-order-model.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class LedgerService extends CrudService<Ledger, number> {
  constructor(private http: HttpClient) {
    super(http, 'ledgers');
  }
  getLedgerWithPurchase(
    id: number
  ): Observable<SingleResponseModel<PurchaseOrderModel>> {
    return this.http
      .get<SingleResponseModel<PurchaseOrderModel>>(
        this.apiUrl + '/purchase/' + id
      )
      .pipe(
        map((x: any) => {
          return <SingleResponseModel<PurchaseOrderModel>>{
            data: {
              ledger: {
                id: x.data.id,
                registerDate: x.data.registerDate.slice(0, 10),
                description: x.data.description,
              },
              purchaseOrder: {
                id: x.data.purchaseOrders[0].id,
                ledgerId: x.data.purchaseOrders[0].ledgerId,
                partnerId: x.data.purchaseOrders[0].partnerId,
                transporterId: x.data.purchaseOrders[0].transporterId,
                currencyId: x.data.purchaseOrders[0].currencyId,
                currencyRate: x.data.purchaseOrders[0].currencyRate,
                customsNumber: x.data.purchaseOrders[0].customsNumber,
                description: x.data.purchaseOrders[0].description,
                isPaid: x.data.purchaseOrders[0].isPaid,
                note: x.data.purchaseOrders[0].note,
                invoiceNumber: x.data.purchaseOrders[0].invoiceNumber,
              },
              purchaseOrderLines: x.data.purchaseOrders[0].purchaseOrderLines,
            },
          };
        })
      );
  }

  getLedgerWithWholeSale(
    id: number
  ): Observable<SingleResponseModel<WholeSaleOrderModel>> {
    return this.http
      .get<SingleResponseModel<WholeSaleOrderModel>>(
        this.apiUrl + '/wholesale/' + id
      )
      .pipe(
        map((x: any) => {
          return <SingleResponseModel<WholeSaleOrderModel>>{
            data: {
              ledger: {
                id: x.data.id,
                registerDate: x.data.registerDate.slice(0, 10),
                description: x.data.description,
              },
              wholeSaleOrder: {
                id: x.data.wholeSaleOrders[0].id,
                ledgerId: x.data.wholeSaleOrders[0].ledgerId,
                partnerId: x.data.wholeSaleOrders[0].partnerId,
                description: x.data.wholeSaleOrders[0].description,
                isPaid: x.data.wholeSaleOrders[0].isPaid,
                note: x.data.wholeSaleOrders[0].note,
                foreign: x.data.wholeSaleOrders[0].foreign,
                wholeSaleOrderNumber:
                  x.data.wholeSaleOrders[0].wholeSaleOrderNumber,
              },
              wholeSaleOrderLines:
                x.data.wholeSaleOrders[0].wholeSaleOrderLines,
            },
          };
        })
      );
  }
}

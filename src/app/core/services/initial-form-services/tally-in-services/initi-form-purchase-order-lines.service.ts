import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class InitFormPurchaseOrderLinesService {
  constructor(private formBuilder: FormBuilder) { }

  initPurchaseOrderLines(): FormGroup {
    return this.formBuilder.group({
      id: [0],
      purchaseOrderId: [0],
      productId: [0],
      warehouseId: [0],
      vatId: [1],
      discountRate: [0],
      customsTaxRate: [0],
      quantity: [1],
      unitPrice: [0],
      discountUnitPrice: [0],
      vatUnitPrice: [0],
      customsTaxUnitPrice: [0],
      exciseTaxUnitPrice: [0],
      transporterUnitPrice: [0],
      reEvaluationUnitPrice: [0],
      grossWithOutVatUnitPrice: [0],
      grossUnitPrice: [0],
      amount: [0],
      discountAmount: [0],
      vatAmount: [0],
      customsTaxAmount: [0],
      exciseTaxAmount: [0],
      transporterAmount: [0],
      reEvaluationAmount: [0],
      grossWithOutVatAmount: [0],
      grossAmount: [0],
    });
  }
}

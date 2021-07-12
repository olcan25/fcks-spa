import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class WholeSaleCreateFormGroupService {
  constructor(private formBuilder: FormBuilder) {}

  initWholeSaleOrderLines(): FormGroup {
    return this.formBuilder.group({
      id: [0],
      wholeSaleOrderId: [0],
      productId: [0],
      warehouseId: [0],
      vatId: [1],
      quantity: [1],
      discountRate: [0],
      unitPrice: [0],
      unitPriceDiscountValue: [0],
      unitPriceVatValue: [0],
      unitPriceWithVat: [0],
      amountDiscountValue: [0],
      amountVatValue: [0],
      amount: [0],
      amountWithVat: [0],
    });
  }
}

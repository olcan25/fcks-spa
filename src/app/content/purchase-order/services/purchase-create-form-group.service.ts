import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CreateFormGroupService {
  constructor(private formBuilder: FormBuilder) {}

  initPurchaseOrderLines(): FormGroup {
    return this.formBuilder.group({
      id: [0],
      purchaseOrderId: [0],
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

// let quantity = this.addForm.value.purchaseOrderLines[i].quantity;
// let unitPriceWithVat = this.addForm.value.purchaseOrderLines[i].unitPriceWithVat;
// let unitPrice = this.addForm.value.purchaseOrderLines[i].unitPrice;
// let amountWithVat = this.addForm.value.purchaseOrderLines[i].amountWithVat;
// let amount = this.addForm.value.purchaseOrderLines[i].amount;
// let discountRate = this.addForm.value.purchaseOrderLines[i].discountRate;
// let vatId = this.addForm.value.purchaseOrderLines[i].vatId;
// let vatArray = [0,8,18];
// amountWithVat = quantity*unitPriceWithVat;
// let vatRate = 1+(vatArray[vatId-1]/100);
// //console.log(vatRate[vatId-1])
// discountRate =discountRate/100;
// let discountUnitPrice = unitPrice*discountRate;
// let discountValue = discountUnitPrice*quantity;
// amountWithVat = quantity*unitPriceWithVat;
// unitPrice = unitPriceWithVat/vatRate;
// amount = amountWithVat/vatRate-discountValue;
// this.purchaseOrderLines.at(i).get('amountWithVat')?.patchValue(amountWithVat)
// this.purchaseOrderLines.at(i).get('unitPrice')?.patchValue(unitPrice)
// this.purchaseOrderLines.at(i).get('amount')?.patchValue(amount)
// this.purchaseOrderLines.at(i).get('discountValue')?.patchValue(discountValue);

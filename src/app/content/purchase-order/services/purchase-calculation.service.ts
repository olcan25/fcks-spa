import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PurchaseCalculationService {
  constructor() {}

  calculateUnitPirceWithVat(
    form: FormGroup,
    formArray: FormArray,
    i: number,
    value: any
  ) {
    let vatId = form.value.purchaseOrderLines[i].vatId;
    let vatArray = [0, 8, 18];
    let vatRate = vatArray[vatId - 1] / 100 + 1;
    const quantity = form.value.purchaseOrderLines[i].quantity;
    const discountRate = form.value.purchaseOrderLines[i].discountRate;
    const unitPriceWithVat = form.value.purchaseOrderLines[i].unitPriceWithVat;
    const unitPriceDiscountValue = (unitPriceWithVat * discountRate) / 100;
    const amountDiscountValue = quantity * unitPriceDiscountValue;
    const unitPrice = (unitPriceWithVat - unitPriceDiscountValue) / vatRate;
    const unitPriceVatValue =
      unitPriceWithVat - unitPriceDiscountValue - unitPrice;
    const amountWithVat =
      quantity * (unitPriceWithVat - unitPriceDiscountValue);
    const amount = quantity * unitPrice;
    const amountVatValue = amountWithVat - amount;
    formArray
      .at(i)
      .get('unitPrice')
      ?.patchValue(isNaN(unitPrice) ? 0 : unitPrice);
    formArray
      .at(i)
      .get('unitPriceDiscountValue')
      ?.patchValue(isNaN(unitPriceDiscountValue) ? 0 : unitPriceDiscountValue);
    formArray
      .at(i)
      .get('unitPriceVatValue')
      ?.patchValue(isNaN(unitPriceVatValue) ? 0 : unitPriceVatValue);
    formArray
      .at(i)
      .get('amountWithVat')
      ?.patchValue(isNaN(amountWithVat) ? 0 : amountWithVat);
    formArray
      .at(i)
      .get('amount')
      ?.patchValue(isNaN(amount) ? 0 : amount);
    formArray
      .at(i)
      .get('amountVatValue')
      ?.patchValue(isNaN(amountVatValue) ? 0 : amountVatValue);
    formArray
      .at(i)
      .get('amountDiscountValue')
      ?.patchValue(isNaN(amountDiscountValue) ? 0 : amountDiscountValue);
  }

  calculateAmountWithPrice(
    form: FormGroup,
    formArray: FormArray,
    i: number,
    value: any
  ) {
    const zero: number = 0;
    let vatId = form.value.purchaseOrderLines[i].vatId;
    let vatArray = [0, 8, 18];
    let vatRate = vatArray[vatId - 1] / 100 + 1;
    const quantity = form.value.purchaseOrderLines[i].quantity;
    const amountWithVat = form.value.purchaseOrderLines[i].amountWithVat;
    const unitPriceWithVat = amountWithVat / quantity;
    const amount = amountWithVat / vatRate;
    const amountVatValue = amountWithVat - amount;
    const unitPrice = unitPriceWithVat / vatRate;
    const unitPriceVatValue = unitPriceWithVat - unitPrice;
    formArray
      .at(i)
      .get('unitPrice')
      ?.patchValue(isNaN(unitPrice) ? 0 : unitPrice);
    formArray
      .at(i)
      .get('unitPriceVatValue')
      ?.patchValue(isNaN(unitPriceVatValue) ? 0 : unitPriceVatValue);
    formArray
      .at(i)
      .get('amount')
      ?.patchValue(isNaN(amount) ? 0 : amount);
    formArray
      .at(i)
      .get('amountVatValue')
      ?.patchValue(isNaN(amountVatValue) ? 0 : amountVatValue);
    formArray
      .at(i)
      .get('unitPriceWithVat')
      ?.patchValue(isNaN(unitPriceWithVat) ? 0 : unitPriceWithVat);
    formArray.at(i).get('discountRate')?.patchValue(zero);
    formArray.at(i).get('unitPriceDiscountValue')?.patchValue(zero);
    formArray.at(i).get('amountDiscountValue')?.patchValue(zero);
  }
}

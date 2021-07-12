import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class OtherCalculationService {
  constructor() { }

  disocuntRate(
    discountRate: number,
    unitPrice: number,
    quantity: number,
    formArray: FormArray,
    i: number
  ): number[] {

    if (discountRate > 0 && discountRate <= 100) {
      let discountUnitPrice = unitPrice * (discountRate / 100);
      let discountAmount = discountUnitPrice * quantity;
      // let grossUnitPrice = unitPrice - discountUnitPrice;
      // const grossAmount = unitPrice * quantity + discountAmount;

      formArray.at(i).get('discountUnitPrice')?.patchValue(discountUnitPrice);
      formArray.at(i).get('discountAmount')?.patchValue(discountAmount);

      return [discountUnitPrice, discountAmount];
    } else {
      formArray.at(i).get('discountUnitPrice')?.patchValue(0);
      formArray.at(i).get('discountAmount')?.patchValue(0);
      return [0, 0];
    }
  }

  tranporterAmount(
    transporterAmount: number,
    quantity: number,
    formArray: FormArray,
    i: number
  ): void {

    if (transporterAmount > 0) {
      let transporterUnitPrice = transporterAmount / quantity;

      formArray
        .at(i)
        .get('transporterUnitPrice')
        ?.patchValue(transporterUnitPrice);
      //    formArray.at(i).get('transporterAmount')?.patchValue(transporterAmount);
    } else {
      formArray.at(i).get('transporterUnitPrice')?.patchValue(0);
      formArray.at(i).get('transporterAmount')?.patchValue(0);
    }
  }

  reEvaluationAmount(
    reEvaluationAmount: number,
    quantity: number,
    formArray: FormArray,
    i: number
  ): number {

    if (reEvaluationAmount > 0) {
      let reEvaluationUnitPrice = reEvaluationAmount * quantity;

      formArray
        .at(i)
        .get('reEvaluationUnitPrice')
        ?.patchValue(reEvaluationUnitPrice);

      return reEvaluationUnitPrice;
    } else {
      formArray.at(i).get('reEvaluationUnitPrice')?.patchValue(0);
      formArray.at(i).get('reEvaluationAmount')?.patchValue(0);

      return 0;
    }
  }

  exciseTaxAmount(
    exciseTaxAmount: number,
    quantity: number,
    formArray: FormArray,
    i: number
  ): void {

    if (exciseTaxAmount > 0) {
      let exciseTaxUnitPrice = exciseTaxAmount / quantity;

      formArray.at(i).get('exciseTaxUnitPrice')?.patchValue(exciseTaxUnitPrice);
    } else {
      formArray.at(i).get('exciseTaxUnitPrice')?.patchValue(0);
      formArray.at(i).get('exciseTaxAmount')?.patchValue(0);
    }
  }

  customsTaxRate(
    customsTaxRate: number,
    amount: number,
    quantity: number,
    formArray: FormArray,
    i: number
  ): number {
    debugger
    if (customsTaxRate > 0) {
      let customsTaxAmount = (amount * (1 + customsTaxRate / 100)) - amount;
      let customsTaxUnitPrice =
        ((amount / quantity) * (1 + customsTaxRate / 100)) - (amount / quantity);

      formArray
        .at(i)
        .get('customsTaxUnitPrice')
        ?.patchValue(customsTaxUnitPrice);
      formArray.at(i).get('customsTaxAmount')?.patchValue(customsTaxAmount);

      return customsTaxAmount;
    } else {
      formArray.at(i).get('customsTaxUnitPrice')?.patchValue(0);
      formArray.at(i).get('customsTaxAmount')?.patchValue(0);

      return 0;
    }
  }

  vatRate(vatRate: number, amount: number, quantity: number, reEvaluationAmount: number, formArray: FormArray, i: number) {
    //Gross WithOut
    debugger
    let grossWithOutAmount = amount;

    let grossWithOutUnitPrice = grossWithOutAmount / quantity;

    //GrossAmount With GrossUnitPrice
    let grossUnitPrice = grossWithOutUnitPrice * vatRate;
    let grossAmount = grossWithOutAmount * vatRate;
    formArray.at(i).get('grossUnitPrice')?.patchValue(grossUnitPrice);
    formArray.at(i).get('grossAmount')?.patchValue(grossAmount);

    //Vat UnitPrice With VatAmount
    let vatUnitPrice = grossUnitPrice - grossWithOutUnitPrice;
    let vatAmount = grossAmount - grossWithOutAmount;
    formArray.at(i).get('vatUnitPrice')?.patchValue(vatUnitPrice);
    formArray.at(i).get('vatAmount')?.patchValue(vatAmount);

    if (reEvaluationAmount > 0) {
      grossWithOutAmount -= reEvaluationAmount;
      grossWithOutUnitPrice = grossWithOutAmount / quantity;
    }

    formArray.at(i).get('grossWithOutVatAmount')?.patchValue(grossWithOutAmount);
    formArray.at(i).get('grossWithOutVatUnitPrice')?.patchValue(grossWithOutUnitPrice);
  }
}

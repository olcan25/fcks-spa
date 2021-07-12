import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { OtherCalculationService } from './other-calculation.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderLinesCalculationNetService {
  constructor(private otherCalculationService: OtherCalculationService) { }

  calculateUnitPrice(
    form: FormGroup,
    formArray: FormArray,
    i: number,
    value: any,
    currencyRate: number
  ) {
    let vatId = Number(form.value.purchaseOrderLines[i].vatId);
    let vatArray = [NaN, 0, 8, 18];
    let vatRate = vatArray[vatId] / 100 + 1;
    let customsTaxRate = Number(
      form.value.purchaseOrderLines[i].customsTaxRate
    );
    let values: number[] = [];
    let grossUnitPrice = 0;
    let gorssAmount = 0;
    let customsTaxAmount = 0;

    let unitPrice = Number(form.value.purchaseOrderLines[i].unitPrice);
    let quantity = Number(form.value.purchaseOrderLines[i].quantity);
    let discountRate = Number(form.value.purchaseOrderLines[i].discountRate);
    let transporterAmount = Number(
      form.value.purchaseOrderLines[i].transporterAmount
    );
    let exciseTaxAmount = Number(
      form.value.purchaseOrderLines[i].exciseTaxAmount
    );
    let reEvaluationAmount = Number(
      form.value.purchaseOrderLines[i].reEvaluationAmount
    );
    let amount = quantity * unitPrice;
    formArray.at(i).get('amount')?.patchValue(amount);
    unitPrice = unitPrice * Number(currencyRate);
    amount = quantity * unitPrice;

    //indirim orani hesaplay
    values = this.otherCalculationService.disocuntRate(discountRate, unitPrice, quantity, formArray, i);
    grossUnitPrice = unitPrice - values[0];
    gorssAmount = amount - values[1];

    //transport degerini birim fiyat ve tutar ile toplaym
    this.otherCalculationService.tranporterAmount(transporterAmount, quantity, formArray, i);

    gorssAmount += transporterAmount;

    //rivlerism bulmak icin
    reEvaluationAmount = isNaN(reEvaluationAmount) ? 0 : reEvaluationAmount;
    this.otherCalculationService.reEvaluationAmount(reEvaluationAmount, quantity, formArray, i);

    gorssAmount += reEvaluationAmount;

    //akciza hesaplanma
    this.otherCalculationService.exciseTaxAmount(exciseTaxAmount, quantity, formArray, i);

    //dogana orni hesaplama
    customsTaxAmount = this.otherCalculationService.customsTaxRate(customsTaxRate, gorssAmount, quantity, formArray, i);

    gorssAmount = gorssAmount + customsTaxAmount + exciseTaxAmount;

    this.otherCalculationService.vatRate(vatRate, gorssAmount, quantity, reEvaluationAmount, formArray, i);
  }
}

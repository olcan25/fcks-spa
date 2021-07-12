import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class INitFormPurchaseOrderService {
  constructor(private formBuilder: FormBuilder) { }

  initPurchaseOrder(): FormGroup {
    return this.formBuilder.group({
      id: [0],
      ledgerId: [0],
      partnerId: [0, [Validators.min(1)]],
      // transporterId: [0],
      currencyId: [1],
      currencyRate: [1],
      invoiceNumber: ['', [Validators.required]],
      customsNumber: [''],
      note: [''],
      description: [''],
      isPaid: [false],
    });
  }

  initImportPurchaseOrder(): FormGroup {
    return this.formBuilder.group({
      id: [0],
      ledgerId: [0],
      partnerId: [0, [Validators.min(1)]],
      transporterId: [0],
      currencyId: [1],
      currencyRate: [1],
      invoiceNumber: ['', [Validators.required]],
      customsNumber: [''],
      note: [''],
      description: [''],
      isPaid: [false],
    });
  }
}

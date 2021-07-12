import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InitFormLedgerService {

  constructor(private formBuilder: FormBuilder) { }

  initLedger(): FormGroup {
    return this.formBuilder.group({
      id: [0],
      registerDate: [
        formatDate(Date.now(), 'yyyy-MM-dd', 'en'),
        Validators.required,
      ],
      description: [''],
    });
  }
}

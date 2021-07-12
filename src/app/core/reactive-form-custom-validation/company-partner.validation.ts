import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidateUIDNumber(
  control: AbstractControl
): ValidationErrors | null {
  if (
    !control.value ||
    control.value.startsWith('8') ||
    control.value.startsWith('6')
  ) {
    return null;
  } else {
    return { invalidUID: true };
  }
}

export function ValidateVatNumber(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value || control.value.startsWith('3')) {
    return null;
  } else {
    return { invalidVat: true };
  }
}

import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReactiveFormCalculationService {

  constructor() { }

  sumTotal(formGroup:FormGroup,formArrayName:any):number[]{
    let sumArray:number[]=[]
    formGroup.controls[formArrayName]?.valueChanges.subscribe(val=>{
      sumArray[0] = val.reduce((sum:number,val:any)=>sum+= +val.amountWithVat,0)
      sumArray[1] = val.reduce((sum:number,val:any)=>sum+= +val.amountVatValue,0)
      sumArray[2] = val.reduce((sum:number,val:any)=>sum+= +val.amount,0)
    }
    )
    return sumArray;
  }
}

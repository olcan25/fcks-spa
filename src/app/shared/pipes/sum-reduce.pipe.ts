import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumReduce'
})
export class SumReducePipe implements PipeTransform {

  transform(values: any[], attr:any ): number {
    let sum = values.reduce((sum,val)=>sum+=+val[attr],0)
    return sum;
  }

}

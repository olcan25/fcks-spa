export class GetWholeSaleOrderDto {
  id: number = 0;
  ledgerId: number = 0;
  registerDate: Date = new Date();
  partnerName: string = '';
  wholeSaleOrderNumber:number=0;
  ledgerDescription: string = '';
  wholeSaleOrderDescription:string=''
  foreign: boolean = false;
  isPaid: boolean = false;
  amountVatValue: number = 0;
  amount: number = 0;
  amountWithVat: number = 0;
}

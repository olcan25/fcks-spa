export class GetPurchaseOrderDto {
  id: number = 0;
  ledgerId: number = 0;
  registerDate: Date =new Date();
  partnerName: string = '';
  purchaseOrderNumber: number = 0;
  invoiceNumber: string = '';
  note: string = '';
  purchaseOrderDescription: string = '';
  ledgerDescription: string = '';
  isPaid: boolean = false;
  amountVatValue: number = 0;
  amount: number = 0;
  amountWithVat: number = 0;
}

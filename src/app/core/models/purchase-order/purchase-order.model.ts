export class PurchaseOrder {
  id: number = 0;
  ledgerId: number = 0;
  partnerId: number = 0;
  transporterId: number = 0
  currencyId: number = 1;
  currencyRate: number = 1;
  invoiceNumber: string = '';
  customsNumber: string = '';
  note: string = '';
  description: string = '';
  isPaid: boolean = false;
}

export class GetPaymentDto {
  id: number = 0;
  ledgerId: number = 0;
  paymentTypeId: number = 0;
  registerDate: Date = new Date();
  ledgerDescription: string = '';
  partnerName: string = '';
  accountName: string = '';
  paymentDescription: string = '';
  note: string = '';
  paymentType: string = '';
  amount: number = 0;
}

export class InvoiceHead {
  id: number = 0;
  ledgerId: number = 0;
  partnerName: string = '';
  partnerUniqueIdentificationNumber: string = '';
  partnerVatNumber: string = '';
  partnerCountry: string = '';
  partnerCity: string = '';
  partnerAddress: string = '';
  partnerZipCode: string = '';
  partnerPhone: string = '';
  partnerEmail: string = '';
  partnerWebsite: string = '';
  registerDate: string = '';
  invoiceNumber: number = 0;
  description: string = '';
  note: string = '';
  foreign: boolean = false;
  isPaid: boolean = false;
}
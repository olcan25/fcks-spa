export class LedgerAccountDto {
  ledgerId: number = 0;
  ledgerEntryId: number = 0;
  accountId: string = '';
  registerDate: Date = new Date();
  ledgerDescription: string = '';
  accountName: string = '';
  debt: number = 0;
  credit: number = 0;
  balance: number = 0;
}

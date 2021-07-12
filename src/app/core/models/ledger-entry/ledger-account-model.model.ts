import { Ledger } from '../ledger.model';
import { LedgerEntry } from './ledger-entry.model';

export class LedgerAccountModel {
  ledger: Ledger = new Ledger();
  ledgerEntries: LedgerEntry[] = [];
}

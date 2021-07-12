import { Ledger } from "../ledger.model";
import { Payment } from "./payment.model";

export class PaymentModel{
    ledger:Ledger = new Ledger();
    payment:Payment = new Payment();
}
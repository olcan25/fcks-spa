import { Ledger } from "../ledger.model";
import { PurchaseOrderLine } from "./pruchase-order-line.model";
import { PurchaseOrder } from "./purchase-order.model";

export class PurchaseOrderModel{
    ledger:Ledger=new Ledger();
    purchaseOrder:PurchaseOrder= new PurchaseOrder();
    purchaseOrderLines:PurchaseOrderLine[] = [];
}
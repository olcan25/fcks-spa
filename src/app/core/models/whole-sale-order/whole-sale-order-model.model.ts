import { Ledger } from "../ledger.model";
import { WholeSaleOrderLine } from "./whole-sale-order-line.model";
import { WholeSaleOrder } from "./whole-sale-order.model";

export class WholeSaleOrderModel{
    ledger:Ledger = new Ledger();
    wholeSaleOrder:WholeSaleOrder = new WholeSaleOrder();
    wholeSaleOrderLines:WholeSaleOrderLine[]=[];
}
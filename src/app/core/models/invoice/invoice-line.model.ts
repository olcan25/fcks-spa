export class InvoiceLine {
    id: number=0
    wholeSaleOrderId: number=0
    productBarcode:string =''
    productName: string=''
    unitOfMeasureShortName: string=''
    vatId: number=0
    quantity: number=0
    discountRate: number=0
    unitPrice: number=0
    unitPriceDiscountValue: number=0
    unitPriceVatValue: number=0
    unitPriceWithVat: number=0
    amountDiscountValue: number=0
    amountVatValue: number=0
    amount: number=0
    amountWithVat: number=0
}
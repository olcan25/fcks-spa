import { ProductBarcode } from "./product-barcode.model";
import { Product } from "./product.model";

export class ProductModel{
    product:Product = new Product();
    productBarcodes:ProductBarcode[]=[];
}
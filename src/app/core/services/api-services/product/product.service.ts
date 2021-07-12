import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { ResponseModel } from 'src/app/core/models/base-model/respnse-model.model';
import { SingleResponseModel } from 'src/app/core/models/base-model/single-response-model.model';
import { DtoProduct } from 'src/app/core/models/product/get-dto-product.model';
import { ProductBarcode } from 'src/app/core/models/product/product-barcode.model';
import { ProductModel } from 'src/app/core/models/product/product-model.model';
import { Product } from 'src/app/core/models/product/product.model';
import { environment } from 'src/environments/environment';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends CrudService<Product, number> {
  constructor(private http: HttpClient) {
    super(http, `products`);
  }

  getAllDtoProducts(): Observable<ListResponseModel<DtoProduct>> {
    return this.http.get<ListResponseModel<DtoProduct>>(this.apiUrl);
  }

  getDtoProductDetail(id: number): Observable<SingleResponseModel<DtoProduct>> {
    return this.http.get<SingleResponseModel<DtoProduct>>(
      `${this.apiUrl}/detail/${id}`
    );
  }

  getByIdBarcodes(
    productId: number
  ): Observable<ListResponseModel<ProductBarcode>> {
    return this.http.get<ListResponseModel<ProductBarcode>>(
      this.apiUrl + '/barcodes/' + productId
    );
  }

  addProductModel(productModel: ProductModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(
      this.apiUrl,
      productModel,
      this.httpOptions
    );
  }

  deleteProductModel(id: number): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(
      this.apiUrl + '/' + id,
      this.httpOptions
    );
  }

  updateProductModel(productModel: ProductModel): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(
      this.apiUrl,
      productModel,
      this.httpOptions
    );
  }
}

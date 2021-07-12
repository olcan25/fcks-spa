import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  catchError,
  delay,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { ResponseModel } from 'src/app/core/models/base-model/respnse-model.model';
import { SingleResponseModel } from 'src/app/core/models/base-model/single-response-model.model';
import { environment } from 'src/environments/environment';
import { CrudOperations } from './crud-operations.interface';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T, ID> implements CrudOperations<T, ID> {
  apiUrl: string = `${environment.baseUrl}${this._base}`;

  constructor(
    protected _http: HttpClient,
    @Inject(String) protected _base: string
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  httpOptions2 = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    }),
    responseType: 'text',
  };

  httpOptionsPlain = {
    headers: new HttpHeaders({
      Accept: 'text/plain',
      'Content-Type': 'text/plain',
    }),
    responseType: 'text',
  };

  add(t: T): Observable<ResponseModel> {
    return this._http.post<ResponseModel>(this.apiUrl, t, this.httpOptions);
  }

  update(t: T): Observable<ResponseModel> {
    return this._http.put<ResponseModel>(this.apiUrl, t, this.httpOptions);
  }

  getById(id: ID): Observable<SingleResponseModel<T>> {
    return this._http
      .get<SingleResponseModel<T>>(this.apiUrl + '/id/' + id)
      .pipe(distinctUntilChanged());
  }

  getAll(): Observable<ListResponseModel<T>> {
    return this._http
      .get<ListResponseModel<T>>(this.apiUrl)
      .pipe(distinctUntilChanged());
  }

  delete(id: ID): Observable<ResponseModel> {
    return this._http.delete<ResponseModel>(
      this.apiUrl + '/' + id,
      this.httpOptions
    );
  }
}

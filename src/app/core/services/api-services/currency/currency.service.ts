import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from 'src/app/core/models/currency/currency.model';
import { CrudService } from '../base/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends CrudService<Currency, number> {

  constructor(private http: HttpClient) {
    super(http, 'currencies')
  }
}

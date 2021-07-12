import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Country } from '../../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryCityService {

  constructor(private http:HttpClient) { 
  }

  getAllCountries():Observable<Country[]>{
    return this.http.get<Country[]>('https://restcountries.eu/rest/v2/all')
  }
}

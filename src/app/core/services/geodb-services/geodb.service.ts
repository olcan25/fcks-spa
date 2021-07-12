import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class GeodbService {
  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'X-CSCAPI-KEY':
        'eERHWXlsTnR1ZHJLUlVSWmN4bXJNUkxOdW42Mm1jN0M3OUd5blNlSg==',
    });
    return this.http.get<Country[]>(
      'https://api.countrystatecity.in/v1/countries',
      { headers }
    );
  }
}

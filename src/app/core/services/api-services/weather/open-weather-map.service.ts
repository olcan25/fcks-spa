import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootWeather } from 'src/app/core/models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherMapService {
  apiKey: string = '755bceb33fa70316d5fda0c86387e745';
  url: string = 'https://api.openweathermap.org/data/2.5/weather?id=';

  constructor(private http: HttpClient) {}

  getAllWeatherToday(id: number): Observable<RootWeather> {
    return this.http.get<RootWeather>(
      this.url + id + '&units=metric&appid=' + this.apiKey
    );
  }
}

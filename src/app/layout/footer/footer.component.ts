import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RootWeather } from 'src/app/core/models/weather.model';
import { OpenWeatherMapService } from 'src/app/core/services/api-services/weather/open-weather-map.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  appVersion: string = environment.appVersion;
  weather!: RootWeather;

  constructor(private weatherService: OpenWeatherMapService) {}

  ngOnInit(): void {
    this.loadWeather();
  }
  loadWeather() {
    this.weatherService.getAllWeatherToday(786712).subscribe((data) => {
      this.weather = data;
    });
  }
}

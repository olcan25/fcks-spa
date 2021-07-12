import { Component, OnInit } from '@angular/core';
import { OpenWeatherMapService } from 'src/app/core/services/api-services/weather/open-weather-map.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  
  }


}

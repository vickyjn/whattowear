import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get('assets/json/wear-config.json');
  }

  getWeatherData(lat, lon) {
    const appId = 'bf19b7cff9f04705d021993e5b9c8f4c';
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + appId);
  }

  getWeatherString(place) {
    const appId = 'bf19b7cff9f04705d021993e5b9c8f4c';
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + place + '&units=metric&appid=' + appId);
  }
}

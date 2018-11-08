import { Component, OnInit, Output } from '@angular/core';
import { CommonService } from './service.service';
import { Config } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'whattowear';
  config: Array<Config>;
  weatherData;
  dateGroups;
  city;
  lat: Number = 44.63;
  lon: Number = 28.77;
  showLoading: Boolean = true;
  constructor(public service: CommonService) { }

  ngOnInit() {
    this.loadConfig();
  }

  loadConfig() {
    this.service.getConfig().subscribe((config: Array<Config>) => {
      this.config = config;
      this.getWeather(this.lat, this.lon);
    });
  }

  getWeatherString(place) {
    this.service.getWeatherString(place).subscribe((data: any) => {
      const coords = data.coord;
      this.getWeather(coords.lat, coords.lon);
    });
  }

  getWeather(lat, lon) {
    this.service.getWeatherData(lat, lon).subscribe((data: any) => {
      this.processData(data);
    });
  }

  resetLocation(position) {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    this.showLoading = true;
    this.getWeather(this.lat, this.lon);
  }

  processData(data) {
    const formattedGroup = [];
    const values = ['temp', 'temp_min', 'temp_max'];
    const processed = [];
    const groups = {};
    values.forEach((val) => {
      const dataObj = { 'id': val, values: [] };
      (data.list).forEach((list) => {
        const valObj = { date: new Date(list.dt_txt), temperature: list.main[val] };
        dataObj.values.push(valObj);
        const date = list.dt_txt.split(' ')[0];
        if (date in groups) {
          groups[date].push(list);
        } else {
          groups[date] = new Array(list);
        }
      });
      processed.push(dataObj);
    });
    let x = 0;
    for (const group in groups) {
      if (groups[group]) {
        x++;
        const newObj = this.processList(group, groups);
        if (x && x <= 5) {
          formattedGroup.push(newObj);
        }
      }
    }
    this.dateGroups = formattedGroup;
    this.weatherData = processed;
    this.showLoading = false;
    this.city = data.city.name;
  }
  processList(group, groups) {
    let pObj = {
      date: '',
      desc: '',
      img: '',
      climate: '',
      temp:null
    };
    const val = groups[group][0],
    conf = this.config,
    temp = val.main.temp;
    conf.forEach((con) => {
      if (temp > con.min && temp < con.max) {
        pObj = {
          date: group,
          desc: con.title,
          img: con.image,
          climate: con.climate,
          temp:temp
        };
      }
    });
    return pObj;
  }
}

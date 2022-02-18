import { Component } from '@angular/core';
import {
  View,
  EventSettingsModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
} from '@syncfusion/ej2-angular-schedule';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'planner-app';
  mobile: boolean = false;
  constructor(public router: Router) {  }
  ngOnInit() {if (window.screen.width <= 768) { // 768px portrait
    this.mobile = true;
  }}
}

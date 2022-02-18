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
@Component({
  selector: 'app-HomePage',
  template: `<ejs-schedule
    width="100%"
    height="550px"
    [selectedDate]="setDate"
    [currentView]="setView"
    [eventSettings]="eventSettings"
  >
    <e-views>
      <e-view option="Week"> </e-view>
      <e-view option="Today"> </e-view>
      <e-view option="Month" isSelected="true"> </e-view>
      
    </e-views>
  </ejs-schedule> `,
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
  ],
  styleUrls: ['./HomePage.component.css'],
})
export class HomePageComponent {
  public setView: View = 'Week';
  public setDate: Date = new Date(2019, 0, 15);

  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Meditation time',
        StartTime: new Date(2019, 0, 17, 11, 0),
        EndTime: new Date(2019, 0, 17, 11, 30),
      },
    ],
    fields: {
      id: 'Id',
      subject: { name: 'Subject', title: 'Event Name' },
      location: { name: 'Location', title: 'Event Location' },
      description: { name: 'Description', title: 'Event Description' },
      startTime: { name: 'StartTime', title: 'Start Duration' },
      endTime: { name: 'EndTime', title: 'End Duration' },
    },
  };
}

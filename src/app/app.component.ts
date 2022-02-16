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
  selector: 'app-root',
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
  ],
  // specifies the template string for the Schedule component
  template: `<ejs-schedule
    width="100%"
    height="550px"
    [selectedDate]="setDate"
    [currentView]="setView"
    [eventSettings]="eventSettings"
  >
    <e-views>
      <e-view option="Week">
        <ng-template #eventSettingsTemplate let-data>
          <div class="week-template-wrapper">{{ data.Subject }}</div>
        </ng-template>
      </e-view>

      <e-view option="Month" isSelected="true">
        <ng-template #eventTemplate let-data>
          <div class="template-wrapper">{{ data.Location }}</div>
        </ng-template>
      </e-view>

      <e-view displayName="3 Days" option="Day" interval="3"></e-view>
      <e-view displayName="2 Weeks" option="Week" interval="2"></e-view>
    </e-views>
  </ejs-schedule> `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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

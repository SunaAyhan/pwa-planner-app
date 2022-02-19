import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

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
  templateUrl: './HomePage.component.html',
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
  auth:number =0;
  public setView: View = 'Week';
  public setDate: Date = new Date(2022, 1);
  eventData: any;
  items: Array<any>=[];
  resItems: any;
  collectionName:any="demo";
  public eventSettings: EventSettingsModel={
    fields: {
      id: 'Id',
      subject: { name: 'Subject', title: 'Event Name' },
      location: { name: 'Location', title: 'Event Location' },
      description: { name: 'Description', title: 'Event Description' },
      startTime: { name: 'StartTime', title: 'Start Duration' },
      endTime: { name: 'EndTime', title: 'End Duration' },
    },
  };
  public ItemsAng!: AngularFirestoreCollection;
  public data!: AngularFirestoreCollection;
  public schData = {guid:"1", id: "null", subject: "null", location: "null", description: "null", startTime: "null", endTime: "null"};

  public categoryDataSource: any;
  constructor(db: AngularFirestore,private route: ActivatedRoute,private router: Router ) {
    this.collectionName = this.route.snapshot.paramMap.get('id');

    let callenders = localStorage.getItem('myCalendars')? JSON.parse(localStorage.getItem('myCalendars')!):[];
    let authData = db.collection("auth").doc(this.collectionName);
    authData.valueChanges().subscribe(data => {
      let data2:any = data? data:[]
      if(data2.pass==callenders.filter((item: any) => {
        return item.id.includes(this.collectionName);
      })[0].pass){
        this.auth=1;
      }else this.auth=0;
      console.log(this.auth);
    if(this.auth==1){
      this.ItemsAng = db.collection(this.collectionName+'_ResourceData')
      this.resItems = this.ItemsAng.valueChanges().subscribe(resData => { // Resource Data source
        this.categoryDataSource = resData; 
      })
      this.data = db.collection(this.collectionName);
      this.eventData = this.data.valueChanges().subscribe(data => { // Scheduler events
        this.eventData = data;
        let length = this.eventData.length;
        console.log(this.items)
        for (let i = 0; i < length; i++) {
          let endTime = this.eventData[i].endTime.seconds.toString() + "000";
          let srtTime = this.eventData[i].startTime.seconds.toString() + "000";
          let itemTmp={guid:"1",id: "null", subject: "null", location: "null", description: "null", startTime: "null", endTime: "null"}
          this.items.push(itemTmp)
          this.items[i].StartTime = new Date(parseInt(srtTime));
          this.items[i].EndTime = new Date(parseInt(endTime));
          this.items[i].Subject = this.eventData[i].subject;
          this.items[i].Id = this.eventData[i].id;
          this.items[i].Description = this.eventData[i].description;
          this.items[i].guid = this.eventData[i].guid;
        }
        this.eventSettings= {
          dataSource: this.items,
          fields: {
            id: 'Id',
            subject: { name: 'Subject', title: 'Event Name' },
            description: { name: 'Description', title: 'Event Description' },
            startTime: { name: 'StartTime', title: 'Start Duration' },
            endTime: { name: 'EndTime', title: 'End Duration' },
          },
        };
      })
    }else{
      this.router.navigate(['/mycalendars']);
    }
    })
    
  }
  public onActionBegin(args: any): void {
    if(this.auth==1){
      if (args.requestType == "eventChange") {
        this.data.doc(args.changedRecords[0].guid).update({ subject: args.changedRecords[0].Subject });
        this.data.doc(args.changedRecords[0].guid).update({ endTime: args.changedRecords[0].EndTime });
        this.data.doc(args.changedRecords[0].guid).update({ startTime: args.changedRecords[0].StartTime });
        this.data.doc(args.changedRecords[0].guid).update({ description: args.changedRecords[0].Description });
      } else if (args.requestType == "eventCreate") {
        let guid = (this.GuidFun() + this.GuidFun() + "-" + this.GuidFun() + "-4" + this.GuidFun().substr(0, 3) + "-" + this.GuidFun() + "-" + this.GuidFun() + this.GuidFun() + this.GuidFun()).toLowerCase();
        console.log(guid)
        args.data[0].DocumentId = guid.toString();
        console.log(args.data[0])
        this.schData.subject = args.data[0].Subject;
        this.schData.startTime = args.data[0].StartTime;
        this.schData.endTime = args.data[0].EndTime;
        this.schData.id = args.data[0].Id;
        this.schData.description = args.data[0].Description?args.data[0].Description:"null";
        this.schData.guid = guid;
        console.log(this.schData)
        this.data.doc(guid).set(this.schData);
      } else if (args.requestType == "eventRemove") {
        console.log(args.deletedRecords[0].guid)
        this.data.doc(args.deletedRecords[0].guid).delete();
      }
    }
  }
  public GuidFun() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  
}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {NgForm} from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-NewCalendar',
  templateUrl: './NewCalendar.component.html',
  styleUrls: ['./NewCalendar.component.css']
})
export class NewCalendarComponent implements OnInit {
  myCalendars:any=[];
  constructor(public db: AngularFirestore,private clipboard: Clipboard) {
    this.myCalendars = localStorage.getItem('myCalendars')? JSON.parse(localStorage.getItem('myCalendars')!):this.myCalendars;
    console.log(this.myCalendars);
   }
  onSubmit(f: NgForm) {
    
    if(!this.myCalendars.filter((item: any) => {
      return item.name.includes(f.value.name);
    })[0]){
      let tmpCal = f.value;
      tmpCal.id= (tmpCal.name+"-"+this.GuidFun() + "-" + this.GuidFun()).toLowerCase();
      this.myCalendars.push(tmpCal)
      localStorage.setItem('myCalendars',JSON.stringify(this.myCalendars));
      console.log(this.myCalendars);
      
      let authData = this.db.collection("auth");
      authData.doc(tmpCal.id).set({pass:tmpCal.pass});
    }

  }
  onSubmit2(f: NgForm) {
    let auth = 0;
    let authData = this.db.collection("auth").doc(f.value.id);
    authData.valueChanges().subscribe(data => {
      let data2:any = data? data:[]
      if(data2.pass==f.value.pass){
        auth=1;
      }else auth=0;
      console.log(auth);
      if(auth==1){
        this.myCalendars.push(f.value)
        localStorage.setItem('myCalendars',JSON.stringify(this.myCalendars));
        console.log(this.myCalendars);
      }
    });
  }

  delete(item:any) {
    let auth = 0;
    let authData = this.db.collection("auth").doc(item.id);
    this.myCalendars.pop(item)
    localStorage.setItem('myCalendars',JSON.stringify(this.myCalendars));
    authData.valueChanges().subscribe(data => {
      let data2:any = data? data:[]
      if(data2.pass==item.pass){
        auth=1;
      }else auth=0;
      console.log(auth);
      if(auth==1){
        authData.delete()
      }
    });
  } 

  getId(item:any,element:any) {
    this.clipboard.copy(item.id);
    element.textContent = "Copied to Clipboard"
  } 

  public GuidFun() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  ngOnInit() {
  }

}

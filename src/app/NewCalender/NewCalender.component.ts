import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-NewCalender',
  templateUrl: './NewCalender.component.html',
  styleUrls: ['./NewCalender.component.css']
})
export class NewCalenderComponent implements OnInit {
  myCalenders:any=[];
  constructor(public db: AngularFirestore) {
    this.myCalenders = localStorage.getItem('myCalenders')? JSON.parse(localStorage.getItem('myCalenders')!):this.myCalenders;
    console.log(this.myCalenders);
   }
  onSubmit(f: NgForm) {
    this.myCalenders.push(f.value)
    localStorage.setItem('myCalenders',JSON.stringify(this.myCalenders));
    console.log(this.myCalenders);
    
    let authData = this.db.collection("auth");
    authData.doc(f.value.name).set({pass:f.value.pass});


  }
  onSubmit2(f: NgForm) {
    let auth = 0;
    let authData = this.db.collection("auth").doc(f.value.name);
    authData.valueChanges().subscribe(data => {
      let data2:any = data? data:[]
      if(data2.pass==f.value.pass){
        auth=1;
      }else auth=0;
      console.log(auth);
      if(auth==1){
        this.myCalenders.push(f.value)
        localStorage.setItem('myCalenders',JSON.stringify(this.myCalenders));
        console.log(this.myCalenders);
      }
    });

    


  }
  ngOnInit() {
  }

}

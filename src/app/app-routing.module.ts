import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExistingCalendarComponent } from './ExistingCalendar/ExistingCalendar.component';
import { HomePageComponent } from './HomePage/HomePage.component';
import { NewCalendarComponent } from './NewCalendar/NewCalendar.component';

const routes: Routes = [
  {path:'' , component:NewCalendarComponent },
  {path:'mycalendars' , component:NewCalendarComponent },
  {path:'calendar/:id' , component:HomePageComponent},
  {path:'home' , component:NewCalendarComponent},
  {path:'existing' , component:ExistingCalendarComponent}



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

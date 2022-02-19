import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './HomePage/HomePage.component';
import { NewCalenderComponent } from './NewCalender/NewCalender.component';

const routes: Routes = [
  {path:'mycalendars' , component:NewCalenderComponent },
  {path:'calendar/:id' , component:HomePageComponent},
  {path:'home' , component:NewCalenderComponent}


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

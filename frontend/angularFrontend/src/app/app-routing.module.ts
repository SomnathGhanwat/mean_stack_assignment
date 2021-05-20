import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { SignupComponent } from './Component/signup/signup.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { ListmomentComponent } from './Component/listmoment/listmoment.component';
import { AddmomentComponent } from './Component/addmoment/addmoment.component';

const routes: Routes = [
  {
    path :'',
    redirectTo :"/login",
    pathMatch : 'full'
  },
  {
    path : 'login',component : LoginComponent
  },
  {
    path : 'signup',component : SignupComponent
  },
  {
    path : 'dashboard', component : DashboardComponent
  },
  {
    path : 'listMoment', component : ListmomentComponent
  },
  {
    path : 'addmoment', component : AddmomentComponent
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

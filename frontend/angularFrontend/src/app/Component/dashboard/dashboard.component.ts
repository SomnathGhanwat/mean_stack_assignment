import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public parameter : string = '';
  isChecked = false;
  isMomentList = false;
  isUpdateForm = false;
  hide = true;

  constructor(public activateRoute : ActivatedRoute) { }

  ngOnInit(): void {
  
    console.log("This ", this.activateRoute.snapshot.routeConfig?.path)
    if(this.activateRoute.snapshot.routeConfig?.path == "dashboard") {
      console.log("Active")
      localStorage.setItem("active","Success");
    }


  }

  onSubmit()  {
    console.log("Check")
      }
      listMomentIsClick() {
    this.isChecked = false
    this.isMomentList = false;

  }

  listMoment() {
    this.isMomentList = true;
    this.isChecked = true;
  }

}

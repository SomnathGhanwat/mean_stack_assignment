import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularFrontend';
  isActive = localStorage.getItem('active') == "Success" ? true : false;

  isCheck = false;
 



}

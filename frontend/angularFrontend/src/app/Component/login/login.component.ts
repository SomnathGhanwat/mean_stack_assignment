import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  allresponse : any = {};
   hide = true;
   loginForm!: FormGroup;
   isSpinner= false;

  constructor(private router: Router,public ApiService : ApiService) { }
  

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required,Validators.maxLength(8),Validators.minLength(8)] })
    });
  }

  onSubmit()  {
    this.isSpinner = true;
    const payload = {
      email : this.loginForm.value.email,
      password : this.loginForm.value.password
    }

    console.log("this",this.loginForm);
    this.ApiService.login(payload).subscribe((response : {}) => {
      console.log("Response ", response);
      this.allresponse = JSON.parse(JSON.stringify(response));
      console.log("Response ", response);
      if(this.allresponse.message == "please signup") {
     alert("User Not Signup ....Please signup")
      } else {
        localStorage.setItem("token",this.allresponse.accessToken);
        localStorage.setItem("user_id",this.allresponse.result._id)
        this.router.navigate(['dashboard'])
      }
   
   this.isSpinner = false;
    })
  }

  signup = () => {
    this.router.navigate(['signup'])
  }

}


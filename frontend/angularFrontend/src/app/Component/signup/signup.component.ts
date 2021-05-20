import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hide = true;
  allresponse : any = {}

  constructor(public apiservice : ApiService , public router : Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required, Validators.maxLength(8), Validators.minLength(8)] }),
      firstname: new FormControl('', { validators: [Validators.required] }),
      lastname: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
      mobile: new FormControl('', { validators: [Validators.required] }),

    });
  }

  onSubmit() {
    console.log("Check", this.signupForm)

    const payload = {
      email : this.signupForm.value.email,
      password : this.signupForm.value.password,
      fullname : this.signupForm.value.firstname + this.signupForm.value.lastname,
      city: this.signupForm.value.city 
    };
    this.apiservice.signup(payload).subscribe((response) => {
      console.log("Response",response);
      this.allresponse = JSON.parse(JSON.stringify(response));
      if(this.allresponse.message == "Created") {
        alert("User SignUp Successfully")
        this.signupForm.reset();
        this.router.navigate(['login']);
      } else {
        alert("User Already Signup ....please login")
      }

    })
  }
}

//dssas
//  32434354
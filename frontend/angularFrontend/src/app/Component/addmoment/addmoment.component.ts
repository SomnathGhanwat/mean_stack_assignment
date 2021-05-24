import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-addmoment',
  templateUrl: './addmoment.component.html',
  styleUrls: ['./addmoment.component.scss']
})
export class AddmomentComponent implements OnInit {
  imageSrc!: string;
  hide = true;
  filedata :any;
  addMomentForm!: FormGroup;
  constructor(public apiservice : ApiService) { }

  ngOnInit(): void {
    this.addMomentForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
  
    moment : new FormControl('', [Validators.required]),
   
  })
  }

  onSubmit() {
    console.log("Check",this.addMomentForm);
    const payload = {
      title : this.addMomentForm.value.title,
      tags : this.addMomentForm.value.tags,
      moment_image : this.addMomentForm.value.moment,
      user_id : Number(localStorage.getItem('user_id')),
      //token : localStorage.getItem('token')
    }
    this.apiservice.addMoment(payload).subscribe((response) => {
     alert(JSON.parse(JSON.stringify(response)).message);
    })
  }


  fileEvent(event :any) {
    console.log("Event",event);
    const reader =  new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;
        console.log("Image",this.imageSrc)

        this.addMomentForm.patchValue({
          moment: this.imageSrc
        });

      };

    }
  }
  


/*fileEvent(e :any){
 const file = e.target.files[0];
  this.addMomentForm.patchValue({
    moment :file
  })
}*/

}

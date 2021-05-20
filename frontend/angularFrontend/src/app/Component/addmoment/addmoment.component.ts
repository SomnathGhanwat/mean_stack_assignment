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
  addMomentForm!: FormGroup;
  constructor(public apiservice : ApiService) { }

  ngOnInit(): void {
    this.addMomentForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  })
  }

  onSubmit() {
    console.log("Check",this.addMomentForm);
    const payload = {
      title : this.addMomentForm.value.title,
      tags : this.addMomentForm.value.tags,
      file : this.addMomentForm.value.file,
      user : localStorage.getItem('user_id'),
      token : localStorage.getItem('token')
    }
    this.apiservice.addMoment(payload).subscribe((response) => {
      console.log("Log",response)
    })
  }



  onFileChange(event :any) {
    const reader =  new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.addMomentForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }
  

}

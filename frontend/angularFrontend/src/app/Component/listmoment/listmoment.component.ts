import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Service/api.service';


@Component({
  selector: 'app-listmoment',
  templateUrl: './listmoment.component.html',
  styleUrls: ['./listmoment.component.scss']
})
export class ListmomentComponent implements OnInit {
  isTable = true;
  isUpdateForm = false;
  filedata :any;
  updateFormNumber : any;
  updateForm:any ={
    title : '',
    tags :'',
    file : ''
  }
  updateMomentForm!: FormGroup;
  imageSrc!: string;
  displayedColumns: string[] = ['Sr.no', 'Image', 'Title', 'Tags','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  constructor(public apiservice : ApiService) { }

  ngOnInit(): void {

console.log("Ngonit",this.updateForm.title)    
    this.updateMomentForm = new FormGroup({
      title: new FormControl(this.updateForm.title, [Validators.required]),
      tags: new FormControl(this.updateForm.tags, [Validators.required]),
      file: new FormControl(this.updateForm.file, [Validators.required]),
    
     
    })
    this.dataSource = new MatTableDataSource(); // create new object
    this.getMoment(); // forgeted this line
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getMoment = () => {
    this.apiservice.getAllMoment().subscribe((data :any) => {
      console.log("data",data);
      this.dataSource.data = data.results;
    })
  }

  deleteMoment = (data :any) => {
    console.log("Data",data._id);
    this.apiservice.DeleteMoment(data._id).subscribe((response) => {
      console.log("data",response);
      this.getMoment();
    })
  }

  updateMoment = (updateData : any ) => {
    this.isTable = false;
    this.isUpdateForm = true;
    this.updateFormNumber = updateData._id;
    this.updateForm ={
      title : updateData.title,
      tags : updateData.tags,
      file : this.filedata
    };
  
    this.updateMomentForm = new FormGroup({
      title: new FormControl(this.updateForm.title, [Validators.required]),
      tags: new FormControl(this.updateForm.tags, [Validators.required]),
      file: new FormControl(this.updateForm.file, [Validators.required]),
    
     
    })    
  }

  onSubmit = () => {
    const payload = {
      user_id :  Number(localStorage.getItem('user_id')),
      title : this.updateMomentForm.value.title,
      tags : this.updateMomentForm.value.tags,
      moment_image : this.updateMomentForm.value.file
      
    }
    this.apiservice.updateMoment(payload,this.updateFormNumber).subscribe((response) => {
      console.log("Log",response)
      alert(JSON.parse(JSON.stringify(response)).message)
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
      
        this.updateMomentForm.patchValue({
          file: this.imageSrc
        });

      };

    }
  }
  

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'http://0.0.0.0:4000';

  private showLoader: any = new Subject<any>();
  updatedShowLoaderSubject$ = this.showLoader.asObservable();

  constructor(public http : HttpClient) { }

  setShowLoaderStatus(status: boolean) {
    this.showLoader.next(status);
  }

  public getAllMoment = () => {
    return this.http.get(`${this.apiURL}/allmoment`);
  } 

  public DeleteMoment = (id : Number) => {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization' :  JSON.parse(JSON.stringify(localStorage.getItem('token')))
     });
    return this.http.delete(`${this.apiURL}/deleteMoment/` + id ,{headers : headers})
  }

 

  public login = (data : any) => {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
     });
     console.log("Data",data);
    return this.http.post(`${this.apiURL}/login`,data,{headers : headers});
  } 


  public signup = (data : any) => {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
     });
    return this.http.post(`${this.apiURL}/signup`,data , {headers : headers});
  } 

  public addMoment = (data : any ) => {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization' :  JSON.parse(JSON.stringify(localStorage.getItem('token')))
    
     });

    /* console.log("Data", data.user , typeof data.user)

    const formdata:any = new FormData();
    formdata.append('user_id', data.user );
    formdata.append("title",data.title);
    formdata.append('tags',data.tags);
    formdata.append("moment_image",data.moment);
    console.log("formaa",formdata.get('user_id') , formdata.get('title'),formdata.get('tags') , formdata.get('moment_image'))*/
   

    return this.http.post(`${this.apiURL}/moment`, data ,{headers : headers});
  } 




  public updateMoment = (data : any ,id : any) => {
    let headers = new HttpHeaders({
           'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization' :  JSON.parse(JSON.stringify(localStorage.getItem('token')))
    
     });

    /* console.log("Data", data.user , typeof data.user)

    const formdata:any = new FormData();
    formdata.append('user_id', data.user );
    formdata.append("title",data.title);
    formdata.append('tags',data.tags);
    formdata.append("moment_image",data.moment);
    console.log("formaa",formdata.get('user_id') , formdata.get('title'),formdata.get('tags') , formdata.get('moment_image'))*/
   

    return this.http.put(`${this.apiURL}/updateMoment/` + id, data ,{headers : headers});
  } 





}

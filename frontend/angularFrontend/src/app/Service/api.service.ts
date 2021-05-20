import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public createMoment = (data : any) => {
    return this.http.post(`${this.apiURL}/moment`,data);
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
    
     });

    const formdata = new FormData();
    formdata.append('user_id', data.user );
    formdata.append("title",data.title);
    formdata.append('tags',data.tags);
    formdata.append("moment_image",data.file);
   

    return this.http.post(`${this.apiURL}/moment`, formdata,{headers : headers});
  } 





}

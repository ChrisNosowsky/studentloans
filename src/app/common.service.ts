import { Injectable } from '@angular/core';   
import {Http,Response, Headers, RequestOptions } from '@angular/http';   
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

@Injectable()  
export class CommonService {  
  test = "Common Service Works!";
  private loggedInStatus = false

  constructor(private http: Http) { }  
  
  saveUser(user){      
    return this.http.post('http://localhost:8080/api/SaveUser/', user)  
            .pipe(map((response: Response) =>response.json()))              
  }  
  
  GetUser(){       
    return this.http.get('http://localhost:8080/api/getUser/')  
            .pipe(map((response: Response) => response.json()))              
  }  

  GetUserIssued(){       
    return this.http.get('http://localhost:8080/api/getUserIssued/')  
            .pipe(map((response: Response) => response.json()))              
  } 

 deleteUser(id){   
    return this.http.post('http://localhost:8080/api/deleteUser/',{'id': id})  
            .pipe(map((response: Response) =>response.json()))               
  }
  
  sendMail(user){      
    return this.http.post('http://localhost:8080/api/sendMail/', user)  
            .pipe(map((response: Response) =>response.json()))              
  }
  getEmail(user){       
    return this.http.post('http://localhost:8080/api/getEmail/', user)  
            .pipe(map((response: Response) => response.json()))              
  } 

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }




} 
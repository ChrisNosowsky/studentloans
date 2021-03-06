import { Injectable } from '@angular/core';   
import {Http,Response, Headers, RequestOptions } from '@angular/http';   
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

@Injectable()  
export class CommonService {  
  test = "Common Service Works!";
  private loggedInStatus = false
  private role = ""

  constructor(private http: Http) { }  
  
  saveUser(user){      
    return this.http.post('http://localhost:8080/api/SaveUser/', user)  
            .pipe(map((response: Response) =>response.json()))              
  }  

  SaveApp(user){      
    return this.http.post('http://localhost:8080/api/SaveApp/', user)  
            .pipe(map((response: Response) =>response.json()))              
  }  

  CreateStudentDash(user){      
    return this.http.post('http://localhost:8080/api/CreateStudentDash/', user)  
            .pipe(map((response: Response) =>response.json()))              
  }  

  CreatePaymentLog(user){      
    return this.http.post('http://localhost:8080/api/CreatePaymentLog/', user)  
            .pipe(map((response: Response) =>response.json()))              
  } 
  
  GetUser(org){       
    return this.http.post('http://localhost:8080/api/getUser/', org)  
            .pipe(map((response: Response) => response.json()))              
  }
  GetStudentDashboard(user){       
    return this.http.post('http://localhost:8080/api/getStudentDashboard/', user)  
            .pipe(map((response: Response) => response.json()))              
  }   

  UpdateStudentDashboard(user){       
    return this.http.post('http://localhost:8080/api/UpdateStudentDashboard/', user)  
            .pipe(map((response: Response) => response.json()))              
  }   

  
  UpdateOpenAppToIssued(user){       
    return this.http.post('http://localhost:8080/api/UpdateOpenAppToIssued/', user)  
            .pipe(map((response: Response) => response.json()))              
  }   

  GetLoans(){       
    return this.http.get('http://localhost:8080/api/getLoans/')  
            .pipe(map((response: Response) => response.json()))              
  }  
  FindLoan(user){       
    return this.http.post('http://localhost:8080/api/findLoan/', user)  
            .pipe(map((response: Response) => response.json()))              
  }  
  GetUserIssued(org){       
    return this.http.post('http://localhost:8080/api/getUserIssued/', org)  
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
  sendAppMail(user){      
    return this.http.post('http://localhost:8080/api/sendAppMail/', user)  
            .pipe(map((response: Response) =>response.json()))              
  }
  getEmail(user){       
    return this.http.post('http://localhost:8080/api/getEmail/', user, {withCredentials: true})  
            .pipe(map((response: Response) => response.json()))              
  } 
  getOrgOpenApps(user){       
    return this.http.post('http://localhost:8080/api/getOrgOpenApps/', user)  
            .pipe(map((response: Response) => response.json()))              
  } 
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

  setRole(value: string) {
    this.role = value
  }

  getRole() {
    return this.role
  }




} 
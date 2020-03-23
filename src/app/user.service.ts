import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';

interface myData {
  email: string,
  FirstName: string,
  LastName: string,
  status: boolean,
  role: string,
  isConfirmed: boolean,
  organization: string
}

interface isLoggedIn {
  status: boolean
}

interface logoutStatus {
  success: boolean
}

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<myData>('/api/data', {withCredentials: true})
  }

  isLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('/api/isloggedin')
  }

  logout() {
    return this.http.get<logoutStatus>('/api/logout')
  }

}
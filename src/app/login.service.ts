import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginRole: string;
  constructor() {
   }

   getLoginRole() {
     return this.loginRole;
   }

   setLoginRole(loginRole: string) {
     this.loginRole = loginRole;
   }

}

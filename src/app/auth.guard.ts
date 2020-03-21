import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {CommonService} from './common.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { UserService } from './user.service'
import { LoginService } from './login.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private http: CommonService, private user: UserService, private login: LoginService, private router: Router) {

  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.http.isLoggedIn) {
      return true;
    }
    return this.user.isLoggedIn().pipe(map(res => {
      if(res.status) {
        this.http.setLoggedIn(true)
        return true
      } else {
        this.http.setLoggedIn(false)
        let loginStatus = this.login.getLoginRole()
        this.router.navigate(['/error'])
        return false
      }
    }))
  }
  
}

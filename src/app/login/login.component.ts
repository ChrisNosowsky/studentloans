import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { CommonService } from "../common.service";
import { LoginService } from "../login.service";
import {UserService} from "../user.service";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  status = true;
  loginRole: string;
  roleDB: string;
  constructor(private router: Router, private http: CommonService, private loginService: LoginService, private user: UserService) { }

  ngOnInit() {
    this.loginRole = this.loginService.getLoginRole()
  }
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);

  login(event) {

    if(this.loginRole == "Student Login") {
      this.roleDB = "STUDENT";
    }
    else if(this.loginRole == "Lender Login") {
      this.roleDB = "LENDER"
    }

    event.preventDefault()
    let user = {
      UserEmail: this.emailFormControl.value,
      password: Md5.hashStr(`${this.passwordFormControl.value}`),
      role: this.roleDB
    }
    console.log(user)
    this.http.getEmail(user).subscribe(
      data => {
        let res:any = data;
      },
      err => {
        this.status = false;
        console.log("Error");
      },() => {
        this.status = true;
        console.log("Successful Login!");

        this.router.navigate([`/`]);
        this.http.setLoggedIn(true);
        this.loginService.setLoginRole(this.roleDB);

      }
    );


  }
}

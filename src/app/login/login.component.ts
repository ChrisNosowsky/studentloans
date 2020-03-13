import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { CommonService } from "../common.service";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  status = true;
  constructor(private router: Router, public http: CommonService) { }

  ngOnInit() {
  }
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);

  login() {
    let user = {
      UserEmail: this.emailFormControl.value,
      password: Md5.hashStr(`${this.passwordFormControl.value}`),
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
        this.router.navigate([`/home`]);
      }
    );
  }
}

import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { CommonService } from "../common.service";
import {Md5} from 'ts-md5/dist/md5';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

@Injectable()
export class RegisterComponent implements OnInit {
  element : any;
  buttonText = "Register";
  loading: boolean;
  msuEmail = true;
  alreadyRegistered = false;
  constructor(private router: Router, public http: CommonService) { }
  

  ngOnInit() {
    console.log(this.http.test);
  }
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  firstNameFormControl = new FormControl("", [
    Validators.required
  ]);


  lastNameFormControl = new FormControl("", [
    Validators.required
  ]);

  middleNameFormControl = new FormControl("", [
  ]);


  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);

  register() {
    this.loading = true;
    this.buttonText = "Registering...";
    let user = {
      FirstName: this.firstNameFormControl.value,
      MiddleName: this.middleNameFormControl.value,
      LastName: this.lastNameFormControl.value,
      UserEmail: this.emailFormControl.value,
      password: Md5.hashStr(`${this.passwordFormControl.value}`),
      isConfirmed: false,
      hash: "",
      role: "STUDENT"
    }
    if(this.emailFormControl.value.indexOf("@msu.edu") == -1) {
      this.msuEmail = false;
      this.alreadyRegistered = false;
      console.log("ERROR. NOT AN MSU EMAIl!!!");
      this.router.navigate([`/register`])
      this.loading = false;
      this.buttonText = "Register";
    }
    else {
      this.http.sendMail(user).subscribe(
        data => {
          let res:any = data;
          console.log(
            `${user.FirstName} is successfully register and mail has been sent and the message id is ${res.messageId}`
          );
        },
        err => {
          console.log("Already Registered Email.");
          this.loading = false;
          this.msuEmail = true;
          this.alreadyRegistered = true;
          this.router.navigate([`/register`])
          this.buttonText = "Register";
        },() => {
          this.loading = false;
          this.alreadyRegistered = false;
          this.buttonText = "Registered!";
          this.router.navigate([`/success`]);
          this.msuEmail = true;
        }
      );
    }


  }
}

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
      hash: ""
    }
    console.log(`Password is ${user.password}`);
    this.http.sendMail(user).subscribe(
      data => {
        let res:any = data;
        console.log(
          `${user.FirstName} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttonText = "Register";
      },() => {
        this.loading = false;
        this.buttonText = "Registered!";
        this.router.navigate([`/success`])
      }
    );
  }
}

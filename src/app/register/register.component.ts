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

  APIDFormControl = new FormControl("", [
    Validators.required
  ]);

  DriversLicenseFormControl = new FormControl("", [
    Validators.required
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
      APID: this.APIDFormControl.value,
      DriversLicense: this.DriversLicenseFormControl.value,
      password: Md5.hashStr(`${this.passwordFormControl.value}`),
      isConfirmed: false,
      hash: "",
      organization: "",
      role: "STUDENT"
    }
    let dash = {
      UserEmail: this.emailFormControl.value,
      FirstName: this.firstNameFormControl.value,
      LastName: this.lastNameFormControl.value,
      LoanStatus: "",
      LoanIssued: "",
      LoamAmount: 0,
      NextPayment: "",
      AmountDue: 0,
      RemainingBalance: 0,
      LenderPaid: false,
      isPaid: false,
      isLate: false,
      APID: this.APIDFormControl.value,
      DriversLicense: this.DriversLicenseFormControl.value,
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
          this.http.CreateStudentDash(dash).subscribe(
            data => {
              let res:any = data;
              console.log("Dashboard for Student Created!");
            },
            err => {
              console.log("Dashboard not created.");
            }
          );
          this.loading = false;
          this.alreadyRegistered = false;
          this.buttonText = "Registered!";
          this.router.navigate([`/success-register`]);
          this.msuEmail = true;
        }
      );
    }


  }
}

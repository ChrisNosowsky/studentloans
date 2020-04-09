import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { LoanData, PersonalData, LoanApplication } from 'src/app/application-portal/models/loan-application';
import { UserService } from '../../user.service';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})

export class ApplicationFormComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private user: UserService, private http: CommonService) {}
      mobile= new FormControl("", [
        Validators.required])
      license= new FormControl("", [
        Validators.required])
      apid= new FormControl("", [
        Validators.required])
      loanAmt= new FormControl("", [
        Validators.required])
      transferType= new FormControl("", [
        Validators.required])
      issuer= new FormControl("", [
        Validators.required])
      bankaccount= new FormControl("", [
        Validators.required,
      Validators.minLength(4)])
      routing= new FormControl("", [
        Validators.required])

  transferTypes = ['Cash', 'Direct Transfer To Your Bank Account']
  submitted = false
  loans: any
  FirstName: string
  LastName: string
  email: string
  alreadyApplied = false
  ngOnInit() {
    this.http.GetLoans().subscribe(data => {
      this.loans = data
    })
    this.user.getData().subscribe(data => {
      this.email = data.email
      this.FirstName = data.FirstName
      this.LastName = data.LastName
      let myDash = {
        UserEmail: this.email
      }
      this.http.GetStudentDashboard(myDash).subscribe(data => {
        if(data.LoanStatus === "PENDING" || data.LoanStatus === "APPROVED") {
          this.alreadyApplied = true
        } else {
          this.alreadyApplied = false
        }
      })
    })

  }

  onSubmit(selectedLoan) {
    let selectLoan = {
      LoanName: selectedLoan
    }
    this.http.FindLoan(selectLoan).subscribe(data => {
      let openAppsModel = {
        UserEmail: this.email,
        FirstName: this.FirstName,
        LastName: this.LastName,
        PhoneNumber: this.mobile.value,
        LoanAmount: data.LoanAmount,
        Rate: data.LoanInterest,
        LoanHolder: data.organization,
        PaymentMethod: this.transferType.value,
        Issued: false,
        LoanID: data.LoanID,
        LoanName: data.LoanName,
        APID: this.apid.value,
        DriversLicense: this.license.value,
        LenderPaid: false,
        AppCreateDate: moment().utcOffset(-4).format('MMMM Do YYYY'),
        BankAccount: this.bankaccount.value,
        RoutingNumber: this.routing.value
      }
      let UpdateStudentDash = {
        UserEmail: this.email,
        LoanStatus: "PENDING",
        LoanIssued: data.LoanName,
        LoanAmount: data.LoanAmount,
        PayoffDate: "",
        RemainingBalance: 0
      }
      this.http.SaveApp(openAppsModel).subscribe(
        data => {
          let res:any = data;},
        err => {
          console.log(err)
        },() => {
          console.log('Saved App!');
        }
      );
      this.http.UpdateStudentDashboard(UpdateStudentDash).subscribe(
        data => {
          let res:any = data;},
        err => {
          console.log(err)
        },() => {
          console.log('Dashboard Updated!');
        }
      )
    })
    this.submitted = true
  }

}

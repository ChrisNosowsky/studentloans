import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import {UserService} from '../../user.service';
import {CommonService} from '../../common.service';
import * as moment from 'moment';
@Component({
    selector: 'loan-modal',
    templateUrl: './loanmodal.component.html',
    styleUrls: ['./loanmodal.component.scss']
  })

  export class LoanModal {
    @Input() public UserData;
    dropdownVals = ['Yes', 'No']
    
    constructor(public activeModal: NgbActiveModal, private http: CommonService, private user: UserService) {}
    ngOnInit() {
    }

    noHolds = new FormControl("", [
      Validators.required
    ]);

    isEnrolled = new FormControl("", [
      Validators.required
    ]);

    isTaxpayer = new FormControl("", [
      Validators.required
    ]);

    hasDefaulted = new FormControl("", [
      Validators.required
    ]);

    lenderNotes = new FormControl("", [
      Validators.required
    ]);
 
    onSubmit() {
      
      let user = {
        UserEmail: this.UserData.UserEmail,
        Issued: "true",
        RemainingBalance: 0,
        AppReviewDate: moment().utcOffset(-4).format('MMMM Do YYYY, h:mm:ss a'),
        AdditonalNotes: this.lenderNotes.value
      }

      this.http.UpdateOpenAppToIssued(user).subscribe(
        data => {
          let studentDashUpdate = {
            UserEmail: this.UserData.UserEmail,
            LoanStatus: "APPROVED",
            LoanIssued: data.LoanName,
            LoanAmount: data.LoanAmount,
            RemainingBalance: 0,
            PayoffDate: "05/02/2020",
            APID: data.APID,
            DriversLicense: data.DriversLicense,
          }
          this.http.UpdateStudentDashboard(studentDashUpdate).subscribe( data => {
            let res:any = data
          })
        },
        err => {
          console.log("Error on Updating Open Application");
        },() => {
          console.log("Loan Application Approved");
          let email = {
            UserEmail: this.UserData.UserEmail,
            FirstName: this.UserData.FirstName,
            LastName: this.UserData.LastName,
            Issued: "true",
            LoanName: this.UserData.LoanName,
            LoanAmount: this.UserData.LoanAmount
          }
          this.http.sendAppMail(email).subscribe(data => {
            let res:any = data
          },
          err => {
            console.log("Error on sending email");
          },() => {
            console.log('Email Sent Out!');
            this.activeModal.close();
            window.location.reload();
  
          })
          this.activeModal.close();
          window.location.reload();

        })  


    }

    onReject(){
      let user = {
        UserEmail: this.UserData.UserEmail,
        Issued: "",
        RemainingBalance: 0,
        AppReviewDate: moment().utcOffset(-4).format('MMMM Do YYYY, h:mm:ss a'),
        AdditonalNotes: this.lenderNotes.value
      }
      this.http.UpdateOpenAppToIssued(user).subscribe(
        data => {
          let studentDashUpdate = {
            UserEmail: this.UserData.UserEmail,
            LoanStatus: "REJECTED",
            LoanIssued: data.LoanName,
            PayoffDate: ""
          }
          this.http.UpdateStudentDashboard(studentDashUpdate).subscribe( data => {
            let res:any = data
          })
        },
        err => {
          console.log("Error on Updating Open Application");
        },() => {
          console.log('Loan application rejected');
          let email = {
            UserEmail: this.UserData.UserEmail,
            FirstName: this.UserData.FirstName,
            LastName: this.UserData.LastName,
            Issued: "",
            LoanName: this.UserData.LoanName,
            LoanAmount: this.UserData.LoanAmount
          }
          this.http.sendAppMail(email).subscribe(data => {
            let res:any = data
          },
          err => {
            console.log("Error on sending email");
          },() => {
            console.log('Email Sent Out!');
            this.activeModal.close();
            window.location.reload();
  
          })
          this.activeModal.close();
          window.location.reload();

        })  
    }
    closeModal() {
      this.activeModal.close();
    }

  }
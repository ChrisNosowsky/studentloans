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
    
    loanForm: FormGroup
    constructor(public activeModal: NgbActiveModal, private http: CommonService, private user: UserService) {}
    ngOnInit() {
      this.loanForm = new FormGroup({
        'noHolds': new FormControl(null, Validators.required),
        'isEnrolled': new FormControl(null, Validators.required),
        'isTaxpayer': new FormControl(null, Validators.required),
        'hasDefaulted': new FormControl(null, Validators.required),
        'lenderNotes': new FormControl(null)
      });
    }
 
    onSubmit() {
      
      let user = {
        UserEmail: this.UserData.UserEmail,
        Issued: "true"
      }
      this.http.UpdateOpenAppToIssued(user).subscribe(
        data => {
          let studentDashUpdate = {
            UserEmail: this.UserData.UserEmail,
            LoanStatus: "APPROVED",
            LoanIssued: data.LoanName,
            LoanAmount: data.LoanAmount,
            RemainingBalance: data.LoanAmount,
            AmountDue: 15,
            NextPayment: moment().add(1, 'month').calendar().toString(),
            APID: data.APID,
            DriversLicense: data.DriversLicense
          }
          this.http.UpdateStudentDashboard(studentDashUpdate).subscribe( data => {
            let res:any = data
          })
        },
        err => {
          console.log("Error on Updating Open Application");
        },() => {
          console.log("Loan Application Approved");
          this.activeModal.close();
          window.location.reload();

        })  
    }

    onReject(){
      let user = {
        UserEmail: this.UserData.UserEmail,
        Issued: ""
      }
      this.http.UpdateOpenAppToIssued(user).subscribe(
        data => {
          let studentDashUpdate = {
            UserEmail: this.UserData.UserEmail,
            LoanStatus: "REJECTED",
            LoanIssued: data.LoanName,
            AmountDue: 0,
            NextPayment: ""
          }
          this.http.UpdateStudentDashboard(studentDashUpdate).subscribe( data => {
            let res:any = data
          })
        },
        err => {
          console.log("Error on Updating Open Application");
        },() => {
          console.log('Loan application rejected');
          this.activeModal.close();
          window.location.reload();

        })  
    }
    closeModal() {
      this.activeModal.close();
    }


  }
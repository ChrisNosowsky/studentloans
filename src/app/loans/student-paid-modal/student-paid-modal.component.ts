import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import {UserService} from '../../user.service';
import {CommonService} from '../../common.service';
import * as moment from 'moment';
@Component({
  selector: 'app-student-paid-modal',
  templateUrl: './student-paid-modal.component.html',
  styleUrls: ['./student-paid-modal.component.scss']
})
export class StudentPaidModal implements OnInit {
  @Input() public UserData;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal, private http: CommonService, private user: UserService) {}

  amountStudentPaid = new FormControl("", [
    Validators.required,
  ]);
  signedName = new FormControl("", [
    Validators.required,
  ]);


  submitted = false;
  ngOnInit() {
  }


  onPay() {
    console.log(this.UserData.markedPaidBy)
    let user = {
      UserEmail: this.UserData.UserEmail,
      LenderPaid: true,
      RemainingBalance: this.UserData.RemainingBalance - this.amountStudentPaid.value,
      markedPaidBy: this.UserData.markedPaidBy
    }
    this.http.UpdateOpenAppToIssued(user).subscribe(
      data => {
        let studentDashUpdate = {
          UserEmail: this.UserData.UserEmail,
          LenderPaid: true,
          RemainingBalance: this.UserData.RemainingBalance - this.amountStudentPaid.value
        }
        this.user.getData().subscribe(
          data => {
            let paymentLog = {
              DateConfirm: moment().utcOffset(-4).format('MMMM Do YYYY, h:mm:ss a'),
              SignedOffBy: this.signedName.value,
              organization: data.organization,
              LoanID: this.UserData.LoanID,
              LoanName: this.UserData.LoanName,
              AmountStudentPaid: this.amountStudentPaid.value,
              CumulativeAmountPaid: this.UserData.LoanAmount + this.amountStudentPaid.value - this.UserData.RemainingBalance,
              StudentFirstName: this.UserData.FirstName,
              StudentLastName: this.UserData.LastName,
              AppID: this.UserData.id //figure this out for objectID.
            }
            this.http.CreatePaymentLog(paymentLog).subscribe(data => {
              let res:any = data
            })
          }
        )


        this.http.UpdateStudentDashboard(studentDashUpdate).subscribe( data => {
          let res:any = data
        })
      },
      err => {
        console.log("Error on Updating Open Application");
      },() => {
        console.log("Successfully Paid");
        this.submitted = true

      })  
  }
  closeModal() {
    this.activeModal.close();
  }

  closeModalSuccess() {
    this.activeModal.close();
    window.location.reload();
  }
}

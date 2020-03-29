import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import {UserService} from '../../user.service';
import {CommonService} from '../../common.service';
@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModal {
  @Input() public UserData;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  
  loanForm: FormGroup

  AmountFormControl = new FormControl("", [
    Validators.required,
  ]);
  PaymentFormControl = new FormControl("", [
    Validators.required,
  ]);


  submitted = false
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

  onPay() {
    let user = {
      UserEmail: this.UserData.UserEmail,
      LenderPaid: true
    }
    this.http.UpdateOpenAppToIssued(user).subscribe(
      data => {
        let studentDashUpdate = {
          UserEmail: this.UserData.UserEmail,
          LenderPaid: true,
          RemainingBalance: this.UserData.LoanAmount
        }
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
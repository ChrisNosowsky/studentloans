import { Component, OnInit, Output, EventEmitter, Directive, Input, SimpleChange } from '@angular/core';

import { CommonService } from '../common.service';
import { UserService } from '../user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {LoanModal} from './loanmodal/loanmodal.component'
import {PaymentModal} from './payment-modal/payment-modal.component'
import {InfoModal} from './info/info.component'
import {StudentPaidModal} from './student-paid-modal/student-paid-modal.component';
import { ExportService } from './../export.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  constructor( public modalService: NgbModal, private loanService: CommonService, private user: UserService, private exportService: ExportService) { }
  loans: any;
  organization: string;
  myLoan:any;
  public UserData = {
    UserEmail: "",
    FirstName: "",
    LastName: "",
    LoanAmount: 0,
    RemainingBalance: 0,
    Rate: 0,
    Transfer: "",
    issued: "",
    APID: "",
    DriversLicense: "",
    markedPaidBy: "",
    LoanName: "",
    LoanID: 0,
    id: ""
  }
  remaining : any
  ngOnInit() {  
    this.user.getData().subscribe(data => {
      this.organization = data.organization
      let user = {
        LoanHolder: this.organization
      }
      this.loanService.getOrgOpenApps(user).subscribe(data =>  {
        this.loans = data
      })  
      
    })

  } 

  openModal(email, first, last, loanamount, remaining=0, rate, transfer, issued, APID, DriversLicense, markedPaidBy="", info="", loanid=0, loanname="", id="") {
    this.UserData.UserEmail = email
    this.UserData.FirstName = first
    this.UserData.LastName = last
    this.UserData.LoanAmount = loanamount
    this.UserData.Rate = rate,
    this.UserData.Transfer = transfer
    this.UserData.issued = issued
    this.UserData.APID = APID
    this.UserData.DriversLicense = DriversLicense
    this.UserData.markedPaidBy = markedPaidBy
    this.UserData.RemainingBalance = remaining
    this.UserData.LoanName = loanname
    this.UserData.LoanID = loanid,
    this.UserData.id = id

    if (issued === 'false') {
      const modalRef = this.modalService.open(LoanModal);
      modalRef.componentInstance.UserData = this.UserData;
      modalRef.result.then((result) => {
        if (result) {
          console.log(result);
        }
      });
    } else {
      if (info === 'info') {
        const modalInfo = this.modalService.open(InfoModal);
        modalInfo.componentInstance.UserData = this.UserData;
        modalInfo.result.then((result) => {
          if (result) {
            console.log(result);
          }
        });
      } 
      else if(info === 'studentAmount') {
        const modalStudentPaid = this.modalService.open(StudentPaidModal);
        modalStudentPaid.componentInstance.UserData = this.UserData;
        modalStudentPaid.result.then((result) => {
          if (result) {
            console.log(result);
          }
        });
      }
      
      else {

        const modalPay = this.modalService.open(PaymentModal);
        modalPay.componentInstance.UserData = this.UserData;
        modalPay.result.then((result) => {
          if (result) {
            console.log(result);
          }
        });

      }


    }



  }

  export() {
    var d = new Date();
    var year = (d.getFullYear()).toString();
    var month = (d.getMonth() + 1).toString();
    var day = (d.getDay() + 1).toString();
    var today = day + '/' + month + '/' + year;
    var title = 'Lending Data ' + today;
    this.exportService.exportExcel(this.loans, title);
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CommonService } from '../common.service';
import { UserService } from '../user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {LoanModal} from './loanmodal/loanmodal.component'
@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  constructor( public modalService: NgbModal, private loanService: CommonService, private user: UserService) { }
  loans: any;
  organization: string;
  myLoan:any;
  public UserData = {
    UserEmail: "",
    FirstName: "",
    LastName: "",
    LoanAmount: 0,
    Rate: 0,
    Transfer: "",
    issued: ""
  }
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

  openModal(email, first, last, loanamount, rate, transfer, issued) {
    this.UserData.UserEmail = email
    this.UserData.FirstName = first
    this.UserData.LastName = last
    this.UserData.LoanAmount = loanamount,
    this.UserData.Rate = rate,
    this.UserData.Transfer = transfer
    this.UserData.issued = issued
    const modalRef = this.modalService.open(LoanModal);
    modalRef.componentInstance.UserData = this.UserData;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

}

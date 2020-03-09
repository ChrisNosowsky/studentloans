import { Component, OnInit } from '@angular/core';

import { CommonService } from '../common.service';
import { Loan } from '../loan';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  showModal : boolean;
  UserID: string;
  Firstname: string;
  Lastname : string;
  DateApplied: string;
  Amount: number;

  constructor(private loanService: CommonService) { }
  onClick(loan) {
    this.showModal = true;
    this.UserID = loan.Userid;
    this.Firstname = loan.FirstName;
    this.Lastname = loan.LastName;
    this.DateApplied = loan.DateIssued;
    this.Amount = loan.LoanAmount;
    console.log("Click!")
    console.log(loan.Userid);
  }

  hide()
  {
    this.showModal = false;

  }
  loans: any;  
  ngOnInit() {    
    this.loanService.GetUser().subscribe(data =>  this.loans = data)  
  } 
}

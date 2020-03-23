import { Component, OnInit } from '@angular/core';

import { CommonService } from '../common.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  constructor(private loanService: CommonService, private user: UserService) { }

  loans: any;
  organization: string;

  ngOnInit() {  
    this.user.getData().subscribe(data => {
      this.organization = data.organization
      let user = {
        LoanHolder: this.organization
      }
      this.loanService.getOrgOpenApps(user).subscribe(data =>  {this.loans = data})  
      
    })

  } 
}

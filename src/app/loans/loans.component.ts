import { Component, OnInit } from '@angular/core';

import { CommonService } from '../common.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  constructor(private loanService: CommonService) { }

  loans: any;  
  ngOnInit() {    
    this.loanService.GetUser().subscribe(data =>  this.loans = data)  
  } 
}

import { Component, OnInit } from '@angular/core';

import { Loan } from '../../loan';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-lender-dashboard',
  templateUrl: './lender-dashboard.component.html',
  styleUrls: ['./lender-dashboard.component.scss']
})
export class LenderDashboardComponent implements OnInit {
  public chartType: string = 'line';
  issuedCount = 0;
  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(64, 201, 162, .8)',
      borderColor: 'rgba(4, 201, 162, 1)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(71, 168, 189, .8)',
      borderColor: 'rgba(0, 10, 130, 1)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


  constructor(private loanService: CommonService) { }

  loans: any;  
  issuedLoans: any;
  ngOnInit() {    
    this.loanService.GetUser().subscribe(data =>  this.loans = data)
    this.loanService.GetUserIssued().subscribe(data2 =>  this.issuedLoans = data2)
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lender-dashboard',
  templateUrl: './lender-dashboard.component.html',
  styleUrls: ['./lender-dashboard.component.scss']
})
export class LenderDashboardComponent implements OnInit {
  public chartType: string = 'line';
  issuedCount = 0;
  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Approved' },
    { data: [2, 8, 0, 5, 12, 3, 7], label: 'Denied' }
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


  public chartTypeDough: string = 'doughnut';

  public chartDatasetsDough: Array<any> = [
    { data: [1, 0], label: 'My First dataset' }
  ];

  public chartLabelsDough: Array<any> = ['Paid', ' Not Paid'];

  public chartColorsDough: Array<any> = [
    {
      backgroundColor: ['#46BFBD', '#F7464A'],
      hoverBackgroundColor: ['#5AD3D1', '#FF5A5E'],
      borderWidth: 2,
    }
  ];

  public chartOptionsDough: any = {
    responsive: true
  };
  public chartClickedDough(e: any): void { }
  public chartHoveredDough(e: any): void { }













  constructor(private user: UserService, private loanService: CommonService, private router: Router) { }

  loans: any;  
  issuedLoans: any;
  email: string
  totalIssued = 0
  totalReview = 0
  totalLoans = 0
  avgInterestIssued:any
  totalInterest = 0
  numberIssued = 0
  numberOpen = 0
  numberRejected = 0
  ngOnInit() {   
    this.user.getData().subscribe(data => {
      if(data.status && data.role === 'LENDER') {
        this.email = data.email
        let org = {
          LoanHolder: data.organization
        }
        this.loanService.GetUser(org).subscribe(data =>  {
          this.loans = data
          var i:number
          for(i =0; i<this.loans.length; i++) {
            if(this.loans[i].Issued === "false") {
              this.totalReview += this.loans[i].LoanAmount
              this.numberOpen += 1
            } else if(this.loans[i].Issued === "true") {
              this.totalIssued += this.loans[i].LoanAmount
              this.totalInterest += this.loans[i].Rate
              this.numberIssued += 1
            } else {
              this.numberRejected += 1
            }
            this.totalLoans += 1
          }
          this.avgInterestIssued = this.totalInterest/i
        })
        this.loanService.GetUserIssued(org).subscribe(data =>  {this.issuedLoans = data         
        }) //may not need this
      } 
      else if(data.role !== 'LENDER') {
        this.router.navigate(['/error'])
      }
      else {
        this.router.navigate(['/logout'])
      }
      
    }) 








  }

  getNumberIssued() {
    const result = this.numberIssued/this.totalLoans * 100;
    return result;
  }
  getNumberRejected() {
    const result = this.numberRejected/this.totalLoans * 100;
    return result;
  }

}

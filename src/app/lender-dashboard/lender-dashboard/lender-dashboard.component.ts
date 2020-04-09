import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-lender-dashboard',
  templateUrl: './lender-dashboard.component.html',
  styleUrls: ['./lender-dashboard.component.scss']
})
export class LenderDashboardComponent implements OnInit {
  public chartType: string = 'line';
  issuedCount = 0;
  public chartDatasets: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Approved' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Denied' }
  ];

  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          max: 20 //will need to dynamically change later
        }
      }],
    }
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


  public chartTypeDough: string = 'doughnut';

  public chartDatasetsDough: Array<any> = [
    { data: [0, 0], label: 'My First dataset' }
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
  totalPaid = 0
  totalAppsToday = 0
  monthListAccepted = new Array<number>(12).fill(0)
  monthListRejected = new Array<number>(12).fill(0)
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
            if (this.loans[i].AppCreateDate.includes(moment().utcOffset(-4).format('MMMM Do YYYY'))) {
              this.totalAppsToday += 1
            }


            if(this.loans[i].Issued === "false") {
              this.totalReview += this.loans[i].LoanAmount
              this.numberOpen += 1
            } else if(this.loans[i].Issued === "true") {
              if(this.loans[i].RemainingBalance !== undefined) {
                this.totalIssued += this.loans[i].LoanAmount - (this.loans[i].LoanAmount - this.loans[i].RemainingBalance)
              } else {
                this.totalIssued += this.loans[i].LoanAmount - (this.loans[i].LoanAmount)
              }
              this.totalInterest += this.loans[i].Rate
              this.numberIssued += 1
              if(this.loans[i].LenderPaid) {
                this.totalPaid += 1;
              }
              if(this.loans[i].AppReviewDate.includes('January')) {this.monthListAccepted[0] += 1}
              else if(this.loans[i].AppReviewDate.includes('February')) {this.monthListAccepted[1] += 1}
              else if(this.loans[i].AppReviewDate.includes('March')) {this.monthListAccepted[2] += 1}
              else if(this.loans[i].AppReviewDate.includes('April')) {this.monthListAccepted[3] += 1}
              else if(this.loans[i].AppReviewDate.includes('May')) {this.monthListAccepted[4] += 1}
              else if(this.loans[i].AppReviewDate.includes('June')) {this.monthListAccepted[5] += 1}
              else if(this.loans[i].AppReviewDate.includes('July')) {this.monthListAccepted[6] += 1}
              else if(this.loans[i].AppReviewDate.includes('August')) {this.monthListAccepted[7] += 1}
              else if(this.loans[i].AppReviewDate.includes('September')) {this.monthListAccepted[8] += 1}
              else if(this.loans[i].AppReviewDate.includes('October')) {this.monthListAccepted[9] += 1}
              else if(this.loans[i].AppReviewDate.includes('November')) {this.monthListAccepted[10] += 1}
              else if(this.loans[i].AppReviewDate.includes('December')) {this.monthListAccepted[11] += 1}
              
            } else {
              this.numberRejected += 1
              if(this.loans[i].AppReviewDate.includes('January')) {this.monthListRejected[0] += 1}
              else if(this.loans[i].AppReviewDate.includes('February')) {this.monthListRejected[1] += 1}
              else if(this.loans[i].AppReviewDate.includes('March')) {this.monthListRejected[2] += 1}
              else if(this.loans[i].AppReviewDate.includes('April')) {this.monthListRejected[3] += 1}
              else if(this.loans[i].AppReviewDate.includes('May')) {this.monthListRejected[4] += 1}
              else if(this.loans[i].AppReviewDate.includes('June')) {this.monthListRejected[5] += 1}
              else if(this.loans[i].AppReviewDate.includes('July')) {this.monthListRejected[6] += 1}
              else if(this.loans[i].AppReviewDate.includes('August')) {this.monthListRejected[7] += 1}
              else if(this.loans[i].AppReviewDate.includes('September')) {this.monthListRejected[8] += 1}
              else if(this.loans[i].AppReviewDate.includes('October')) {this.monthListRejected[9] += 1}
              else if(this.loans[i].AppReviewDate.includes('November')) {this.monthListRejected[10] += 1}
              else if(this.loans[i].AppReviewDate.includes('December')) {this.monthListRejected[11] += 1}
            }
            this.totalLoans += 1
            
          }
          this.updateOnlyDatasets(this.monthListAccepted, this.monthListRejected)
          this.updateOnlyDatasetsDoughnut(this.totalPaid, this.numberIssued - this.totalPaid)
          if (i==0) {
            this.avgInterestIssued = 0.00
          } else {
            this.avgInterestIssued = this.totalInterest/i
          }
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
    if (this.totalLoans == 0) {
      return 0;
    }
    const result = this.numberIssued/this.totalLoans * 100;
    return result;
  }
  getNumberRejected() {
    if (this.totalLoans == 0) {
      return 0;
    }
    const result = this.numberRejected/this.totalLoans * 100;
    return result;
  }

  updateOnlyDatasets(first, second) {
    // This line will update only data in your Chart
    this.chartDatasets = [
      { data: first },
      { data: second },
    ];
  }
  updateOnlyDatasetsDoughnut(first, second) {
    // This line will update only data in your Chart
    console.log(second)
    console.log(first)
    this.chartDatasetsDough = [
      { data: [first, second] }
    ];
  }

}

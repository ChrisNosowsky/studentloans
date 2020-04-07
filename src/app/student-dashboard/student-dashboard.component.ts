import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  email = "Aquiring email..."
  FirstName = ""
  LastName = ""
  LoanStatus = ""
  PayoffDate = "" //date
  LoanIssued = "" //date
  isPaid = ""
  isLate = ""
  RemainingBalance = 0

  constructor(private http: CommonService, private user: UserService, private router: Router, private loginService: LoginService) { }
  ngOnInit() {
    this.user.getData().subscribe(data => {
      if(data.status && data.role === 'STUDENT') {
        this.email = data.email
        console.log(this.email)
        let dash = {
          UserEmail: this.email
        }
        console.log(dash)
        this.http.GetStudentDashboard(dash).subscribe(data => {
          if(data.LoanStatus === "") {
            this.LoanStatus = "No Loan"
          } else {
            this.LoanStatus = data.LoanStatus
          }
          if(data.LoanIssued === "") {
            this.LoanIssued = "No Loan Issued"
          } else {
            this.LoanIssued = data.LoanIssued
          }
          if(data.PayoffDate === "") {
            this.PayoffDate = "No Payment Due"
          } else {
            this.PayoffDate = data.PayoffDate
          }
          this.RemainingBalance = data.RemainingBalance
          if(data.isPaid) {
            this.isPaid = "Paid"
          } else {
            this.isPaid = "Not Paid"
          }
          if(data.isLate) {
            this.isLate = "PAYMENT PAST DUE"
          } else {
            this.isLate = "Not Late"
          }
        })
      } 
      else if(data.role !== 'STUDENT') {
        this.router.navigate(['/error'])
      }
      else {
        this.router.navigate(['/logout'])
      }
      
    })


  }

  
}

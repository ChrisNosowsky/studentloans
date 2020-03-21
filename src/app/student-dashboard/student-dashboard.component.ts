import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  email = "Aquiring email..."
  FirstName = ""
  LastName = ""

  constructor(private user: UserService, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.user.getData().subscribe(data => {
      if(data.status && data.role === 'STUDENT') {
        this.email = data.email
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

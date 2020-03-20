import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private user: UserService, private router: Router, private common: CommonService) { }

  ngOnInit() {
    this.user.logout().subscribe(
      data => {
        let res:any = data;
      },
      err => {
        console.log("Error");
      },() => {
        console.log("Logging out");
        this.router.navigate([''])
        this.common.setLoggedIn(false)
      })

  }

}

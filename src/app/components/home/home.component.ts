import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { UserService } from '../../user.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit{
    login: boolean

    constructor(public loginService: LoginService, private user: UserService ) {

    }
    ngOnInit() {
        this.user.getData().subscribe(data => {
            if(data.status) {
              this.login = data.status
            } else {
              this.login = data.status
            }
            
          })
    }



    role(event) {
        this.loginService.setLoginRole(event.target.innerHTML);
    }
}
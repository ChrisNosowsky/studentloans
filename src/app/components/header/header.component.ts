import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { UserService } from '../../user.service';
import { LoginService } from '../../login.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {
    
    loggedin: boolean
    role: string
    constructor(private common: CommonService, private user: UserService, private loginService: LoginService) {
        
    }
    ngOnInit() {
        this.user.getData().subscribe(data => {
            if(data.status) {
              this.loggedin = data.status
              this.role = data.role
            } else {
              this.loggedin = data.status
              this.role = data.role
            }
            
          })
    }

}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  element : any;
  isRadioChecked = false;
  constructor() { }


  ngOnInit() {
  }

  onCheck(name : String) {
    if(name === 'lender') {
      this.isRadioChecked = false;
    }
    else {
      this.isRadioChecked = true;
    }
  }

}

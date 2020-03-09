import { Component, OnInit, EventEmitter, Input } from '@angular/core';

import { CommonService } from '../../common.service';

import { LoansComponent } from '../loans.component';

@Component({
  selector: 'app-loans',
  templateUrl: './loan-modal.component.html',
  styleUrls: ['./loan-modal.component.scss']
})
export class LoanModalComponent implements OnInit {


  constructor() { }

  ngOnInit() {      
  } 
}
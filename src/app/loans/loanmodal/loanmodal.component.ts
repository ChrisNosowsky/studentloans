import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
    selector: 'loan-modal',
    templateUrl: './loanmodal.component.html',
    styleUrls: ['./loanmodal.component.scss']
  })

  export class LoanModal {
    dropdownVals = ['Yes', 'No']

    loanForm: FormGroup

    ngOnInit() {
      this.loanForm = new FormGroup({
        'noHolds': new FormControl(null, Validators.required),
        'isEnrolled': new FormControl(null, Validators.required),
        'isTaxpayer': new FormControl(null, Validators.required),
        'hasDefaulted': new FormControl(null, Validators.required),
        'lenderNotes': new FormControl(null)
      });
    }

    onSubmit() {
      console.log("Any holds?" + this.loanForm.get('noHolds').value);
    }

    onReject(){
      console.log('Loan application rejected');
    }


    
  }


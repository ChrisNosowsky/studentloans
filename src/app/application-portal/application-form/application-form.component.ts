import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { LoanData, PersonalData, LoanApplication } from 'src/app/application-portal/models/loan-application';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})

export class ApplicationFormComponent implements OnInit {
  loanApplicationForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.loanApplicationForm = this.createFormGroup();
   }

  createFormGroupFormBuilder(formBuilder: FormBuilder) {
    return formBuilder.group({
      personalData: formBuilder.group(new PersonalData()),
      requestType: '',
      text: '',
    });

  }

  createFormGroup() {
    return new FormGroup({
      personalData: new FormGroup({
        email: new FormControl(),
        mobile: new FormControl(),
        schoolYear: new FormControl()
      }),
      loanData: new FormGroup({
        loanAmt: new FormControl(),
        transferType: new FormControl(),
        issuer: new FormControl(),
      }),
      requestType: new FormControl(),
      text: new FormControl()
    });
  }

  schoolYears = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Fifth Year']
  requestTypes = ['Loan1', 'Loan2']
  transferTypes = ['Cash', 'Venmo', 'Direct Transfer To Your Bank Account']
  

  ngOnInit() {
  }

  revert() {
    this.loanApplicationForm.reset();

    this.loanApplicationForm.reset({ personalData: new PersonalData(), 
    requestType: '', text: ''});

    console.log('Form was cleared')
  }


  onSubmit() {
    const result: LoanApplication = Object.assign({},
      this.loanApplicationForm.value);
    result.personalData= Object.assign({},
      result.personalData);

      console.log(result);
  }

}

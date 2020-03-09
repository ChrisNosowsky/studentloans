import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { LoanData, PersonalData, LoanApplication } from 'src/app/application-portal/models/loan-application';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})

export class ApplicationFormComponent implements OnInit {
  loanApplicationForm: FormGroup
  Userid : any;
  LoanAmount: number;
  issued= "true";
  errorMessage = 'error';
  valbutton = 'true';

  constructor(private loanService: CommonService) {
    this.loanApplicationForm = this.createFormGroup();
    this.Userid = '';
   }


  createFormGroup() {
    return new FormGroup({
      Userid: new FormControl(),
      LoanAmount: new FormControl()
    });
  }

  schoolYears = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Fifth Year']
  requestTypes = ['Loan1', 'Loan2']
  transferTypes = ['Cash', 'Venmo', 'Direct Account Transfer']
  

  ngOnInit() {
  }

  revert() {
    this.loanApplicationForm.reset();

    this.loanApplicationForm.reset({ personalData: '', 
    requestType: '', text: ''});

    console.log('Form was cleared')
  }

  loans : any
  onSubmit(loanForm) {
    loanForm.issued = this.valbutton;
    const result: LoanApplication = Object.assign({},);
      this.loanService.saveUser(loanForm).subscribe(data => { alert(data.data);
      this.ngOnInit();
    }
    , error => this.errorMessage = error) 
    result.personalData= Object.assign({},
      result.personalData);

      console.log(this.Userid);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { LoanData, PersonalData, LoanApplication } from 'src/app/application-portal/models/loan-application';
import { UserService } from '../../user.service';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})

export class ApplicationFormComponent implements OnInit {
  loanApplicationForm: FormGroup

  constructor(private formBuilder: FormBuilder, private user: UserService, private http: CommonService) {
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



  transferTypes = ['Cash', 'Venmo', 'Direct Transfer To Your Bank Account']
  submitted = false
  loans: any
  ngOnInit() {
    this.http.GetLoans().subscribe(data => {
      this.loans = data
    })
  }

  revert() {
    this.loanApplicationForm.reset();

    this.loanApplicationForm.reset({ personalData: new PersonalData(), 
    requestType: '', text: ''});

    console.log('Form was cleared')
  }


  onSubmit() {
    this.submitted = true
    const result: LoanApplication = Object.assign({},
      this.loanApplicationForm.value);
    result.personalData= Object.assign({},
      result.personalData);

      console.log(result.personalData.mobile.valueOf());

    let openAppsModel = {
      UserEmail: result.personalData.email.valueOf(),
      FirstName: "",
      LastName: "",
      PhoneNumber: result.personalData.mobile.valueOf(),
      LoanAmount: 0,
      Rate: 0,
      LoanHolder: "",
      PaymentMethod: result.loanData.transferType.valueOf(),
      Issued: false,
    }

    //this.http.SaveApp()



  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { LoanData, PersonalData, LoanApplication } from 'src/app/application-portal/models/loan-application';
import { UserService } from '../../user.service';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})

export class ApplicationFormComponent implements OnInit {
  loanApplicationForm: FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder, private user: UserService, private http: CommonService) {
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
        mobile: new FormControl(),
        license: new FormControl(),
        apid: new FormControl()
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
  FirstName: string
  LastName: string
  email: string
  alreadyApplied = false
  ngOnInit() {
    this.http.GetLoans().subscribe(data => {
      this.loans = data
    })
    this.user.getData().subscribe(data => {
      this.email = data.email
      this.FirstName = data.FirstName
      this.LastName = data.LastName
      let myDash = {
        UserEmail: this.email
      }
      this.http.GetStudentDashboard(myDash).subscribe(data => {
        if(data.LoanStatus === "PENDING" || data.LoanStatus === "APPROVED") {
          this.alreadyApplied = true
        } else {
          this.alreadyApplied = false
        }
      })
    })

  }

  revert() {
    this.loanApplicationForm.reset();
    this.loanApplicationForm.reset({ personalData: new PersonalData(), 
    requestType: '', text: ''});
    console.log('Form was cleared')
  }
  onSubmit(selectedLoan) {
    let selectLoan = {
      LoanName: selectedLoan
    }
    this.http.FindLoan(selectLoan).subscribe(data => {
      let openAppsModel = {
        UserEmail: this.email,
        FirstName: this.FirstName,
        LastName: this.LastName,
        PhoneNumber: result.personalData.mobile.valueOf(),
        LoanAmount: data.LoanAmount,
        Rate: data.LoanInterest,
        LoanHolder: data.organization,
        PaymentMethod: result.loanData.transferType.valueOf(),
        Issued: false,
        LoanID: data.LoanID,
        LoanName: data.LoanName,
        APID: result.personalData.apid.valueOf(),
        DriversLicense: result.personalData.license.valueOf(),
        LenderPaid: false
      }
      let UpdateStudentDash = {
        UserEmail: this.email,
        LoanStatus: "PENDING",
        LoanIssued: data.LoanName,
        LoanAmount: data.LoanAmount,
        NextPayment: "",
        RemainingBalance: 0,
        AmountDue: 0,
        APID: result.personalData.apid.valueOf(),
        DriversLicense: result.personalData.license.valueOf()
      }
      this.http.SaveApp(openAppsModel).subscribe(
        data => {
          let res:any = data;},
        err => {
          console.log(err)
        },() => {
          console.log('Saved App!');
        }
      );
      this.http.UpdateStudentDashboard(UpdateStudentDash).subscribe(
        data => {
          let res:any = data;},
        err => {
          console.log(err)
        },() => {
          console.log('Dashboard Updated!');
        }
      )
    })
    this.submitted = true
    const result: LoanApplication = Object.assign({},
      this.loanApplicationForm.value);
    result.personalData= Object.assign({},
      result.personalData);
    






  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http'; 
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoansComponent } from './loans/loans.component'
import { LenderDashboardComponent } from './lender-dashboard/lender-dashboard/lender-dashboard.component';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationFormComponent } from './application-portal/application-form/application-form.component';
import {CommonService} from './common.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SuccessComponent } from './success/success.component';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import {HttpClientModule} from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { LoanModal } from './loans/loanmodal/loanmodal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuccessRegisterComponent } from './success-register/success-register.component';
import { PaymentModal } from './loans/payment-modal/payment-modal.component';
import { InfoModal } from './loans/info/info.component';
import { StudentPaidModal } from './loans/student-paid-modal/student-paid-modal.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

let options: Partial<IConfig> | (() => Partial<IConfig>);
const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'loandash',
    component: LenderDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'showapplications',
    component: LoansComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'apply',
    component: ApplicationFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'logout',
    component: LogoutComponent
  },
  {
    path:'studentdash',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'success',
    component: SuccessComponent
  },
  {
    path: 'success-register',
    component: SuccessRegisterComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoansComponent,
    LenderDashboardComponent,
    ApplicationFormComponent,
    LoginComponent,
    RegisterComponent,
    SuccessComponent,
    StudentDashboardComponent,
    LogoutComponent,
    ErrorComponent,
    LoanModal,
    SuccessRegisterComponent,
    PaymentModal,
    InfoModal,
    StudentPaidModal
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxMaskModule.forRoot(options),
    ChartsModule,
    WavesModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [CommonService, UserService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [ LoanModal, PaymentModal, InfoModal, StudentPaidModal ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }

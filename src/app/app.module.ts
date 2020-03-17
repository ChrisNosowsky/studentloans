import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http'; 
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Routes, RouterModule } from '@angular/router';
import { LoandashComponent } from './components/loandash/loandash.component';
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
    component: ApplicationFormComponent
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
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoandashComponent,
    HomeComponent,
    LoansComponent,
    LenderDashboardComponent,
    ApplicationFormComponent,
    LoginComponent,
    RegisterComponent,
    SuccessComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ChartsModule,
    WavesModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
    
  ],
  providers: [CommonService, UserService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }

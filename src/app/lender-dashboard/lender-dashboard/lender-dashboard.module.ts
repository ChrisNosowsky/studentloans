import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Chart } from 'chart.js'
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    Chart,
    ChartsModule,
    WavesModule
  ]
})
export class LenderDashboardModule { }

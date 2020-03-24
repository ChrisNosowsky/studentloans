import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanmodalComponent } from './loanmodal.component';

describe('LoanmodalComponent', () => {
  let component: LoanmodalComponent;
  let fixture: ComponentFixture<LoanmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

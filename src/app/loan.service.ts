import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Loan } from './loan';
import { LOANS } from './dummy-loans';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  
  constructor() { }

  getLoans(): Observable<Loan[]> {
    return of (LOANS);
  }
}

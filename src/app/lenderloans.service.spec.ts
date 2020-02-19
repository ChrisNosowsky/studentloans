import { TestBed } from '@angular/core/testing';

import { LenderloansService } from './lenderloans.service';

describe('LenderloansService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LenderloansService = TestBed.get(LenderloansService);
    expect(service).toBeTruthy();
  });
});

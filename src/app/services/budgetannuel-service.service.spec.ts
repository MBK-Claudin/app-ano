import { TestBed } from '@angular/core/testing';

import { BudgetannuelServiceService } from './budgetannuel-service.service';

describe('BudgetannuelServiceService', () => {
  let service: BudgetannuelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetannuelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

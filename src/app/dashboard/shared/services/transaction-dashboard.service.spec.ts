import { TestBed } from '@angular/core/testing';

import { TransactionDashboardService } from './transaction-dashboard.service';

describe('TransactionDashboardService', () => {
  let service: TransactionDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

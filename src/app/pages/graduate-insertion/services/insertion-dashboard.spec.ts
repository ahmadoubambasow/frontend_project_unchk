import { TestBed } from '@angular/core/testing';

import { InsertionDashboard } from './insertion-dashboard';

describe('InsertionDashboard', () => {
  let service: InsertionDashboard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertionDashboard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

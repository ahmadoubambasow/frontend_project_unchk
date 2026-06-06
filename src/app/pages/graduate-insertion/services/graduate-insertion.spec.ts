import { TestBed } from '@angular/core/testing';

import { GraduateInsertion } from './graduate-insertion';

describe('GraduateInsertion', () => {
  let service: GraduateInsertion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraduateInsertion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

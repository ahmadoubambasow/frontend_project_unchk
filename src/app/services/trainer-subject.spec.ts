import { TestBed } from '@angular/core/testing';

import { TrainerSubject } from './trainer-subject';

describe('TrainerSubject', () => {
  let service: TrainerSubject;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerSubject);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

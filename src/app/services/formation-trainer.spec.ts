import { TestBed } from '@angular/core/testing';

import { FormationTrainer } from './formation-trainer';

describe('FormationTrainer', () => {
  let service: FormationTrainer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationTrainer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TrainingModule } from './training-module';

describe('TrainingModule', () => {
  let service: TrainingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

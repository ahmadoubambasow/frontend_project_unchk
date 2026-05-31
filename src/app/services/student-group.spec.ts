import { TestBed } from '@angular/core/testing';

import { StudentGroup } from './student-group';

describe('StudentGroup', () => {
  let service: StudentGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentGroup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

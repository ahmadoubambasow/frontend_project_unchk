import { TestBed } from '@angular/core/testing';

import { StudentContactService } from './student-contact-service';

describe('StudentContactService', () => {
  let service: StudentContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StudentFile } from './student-file';

describe('StudentFile', () => {
  let service: StudentFile;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentFile);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

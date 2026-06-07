import { TestBed } from '@angular/core/testing';

import { PersonnelFileService } from './personnel-file-service';

describe('PersonnelFileService', () => {
  let service: PersonnelFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonnelFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

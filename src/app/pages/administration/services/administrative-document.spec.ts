import { TestBed } from '@angular/core/testing';

import { AdministrativeDocument } from './administrative-document';

describe('AdministrativeDocument', () => {
  let service: AdministrativeDocument;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrativeDocument);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeDocumentDetails } from './administrative-document-details';

describe('AdministrativeDocumentDetails', () => {
  let component: AdministrativeDocumentDetails;
  let fixture: ComponentFixture<AdministrativeDocumentDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrativeDocumentDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrativeDocumentDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

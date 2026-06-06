import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeDocuments } from './administrative-documents';

describe('AdministrativeDocuments', () => {
  let component: AdministrativeDocuments;
  let fixture: ComponentFixture<AdministrativeDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrativeDocuments],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrativeDocuments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

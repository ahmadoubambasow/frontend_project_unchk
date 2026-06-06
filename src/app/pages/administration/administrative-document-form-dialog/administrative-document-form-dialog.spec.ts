import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeDocumentFormDialog } from './administrative-document-form-dialog';

describe('AdministrativeDocumentFormDialog', () => {
  let component: AdministrativeDocumentFormDialog;
  let fixture: ComponentFixture<AdministrativeDocumentFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrativeDocumentFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrativeDocumentFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

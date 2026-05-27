import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentFormDialog } from './enrollment-form-dialog';

describe('EnrollmentFormDialog', () => {
  let component: EnrollmentFormDialog;
  let fixture: ComponentFixture<EnrollmentFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

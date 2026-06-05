import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentContactFormDialog } from './student-contact-form-dialog';

describe('StudentContactFormDialog', () => {
  let component: StudentContactFormDialog;
  let fixture: ComponentFixture<StudentContactFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentContactFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentContactFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

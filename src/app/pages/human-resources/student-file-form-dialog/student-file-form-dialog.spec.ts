import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFileFormDialog } from './student-file-form-dialog';

describe('StudentFileFormDialog', () => {
  let component: StudentFileFormDialog;
  let fixture: ComponentFixture<StudentFileFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentFileFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentFileFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGroupFormDialog } from './student-group-form-dialog';

describe('StudentGroupFormDialog', () => {
  let component: StudentGroupFormDialog;
  let fixture: ComponentFixture<StudentGroupFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentGroupFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentGroupFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

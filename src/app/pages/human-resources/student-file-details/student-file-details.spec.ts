import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFileDetails } from './student-file-details';

describe('StudentFileDetails', () => {
  let component: StudentFileDetails;
  let fixture: ComponentFixture<StudentFileDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentFileDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentFileDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

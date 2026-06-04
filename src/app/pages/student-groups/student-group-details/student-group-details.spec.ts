import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGroupDetails } from './student-group-details';

describe('StudentGroupDetails', () => {
  let component: StudentGroupDetails;
  let fixture: ComponentFixture<StudentGroupDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentGroupDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentGroupDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

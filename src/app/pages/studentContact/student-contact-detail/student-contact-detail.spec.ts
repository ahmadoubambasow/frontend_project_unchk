import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentContactDetail } from './student-contact-detail';

describe('StudentContactDetail', () => {
  let component: StudentContactDetail;
  let fixture: ComponentFixture<StudentContactDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentContactDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentContactDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

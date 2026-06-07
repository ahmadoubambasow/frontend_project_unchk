import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFiles } from './student-files';

describe('StudentFiles', () => {
  let component: StudentFiles;
  let fixture: ComponentFixture<StudentFiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentFiles],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentFiles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

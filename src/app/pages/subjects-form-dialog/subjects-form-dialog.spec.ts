import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsFormDialog } from './subjects-form-dialog';

describe('SubjectsFormDialog', () => {
  let component: SubjectsFormDialog;
  let fixture: ComponentFixture<SubjectsFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectsFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectsFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

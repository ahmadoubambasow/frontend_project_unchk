import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerSubjectsFormDialog } from './trainer-subjects-form-dialog';

describe('TrainerSubjectsFormDialog', () => {
  let component: TrainerSubjectsFormDialog;
  let fixture: ComponentFixture<TrainerSubjectsFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerSubjectsFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerSubjectsFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

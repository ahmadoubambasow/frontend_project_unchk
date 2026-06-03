import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTrainerDialog } from './assign-trainer-dialog';

describe('AssignTrainerDialog', () => {
  let component: AssignTrainerDialog;
  let fixture: ComponentFixture<AssignTrainerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTrainerDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignTrainerDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

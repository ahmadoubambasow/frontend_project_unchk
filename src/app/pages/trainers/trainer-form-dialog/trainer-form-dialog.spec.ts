import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerFormDialog } from './trainer-form-dialog';

describe('TrainerFormDialog', () => {
  let component: TrainerFormDialog;
  let fixture: ComponentFixture<TrainerFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleFormDialog } from './schedule-form-dialog';

describe('ScheduleFormDialog', () => {
  let component: ScheduleFormDialog;
  let fixture: ComponentFixture<ScheduleFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

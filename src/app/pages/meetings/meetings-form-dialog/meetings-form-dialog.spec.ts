import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsFormDialog } from './meetings-form-dialog';

describe('MeetingsFormDialog', () => {
  let component: MeetingsFormDialog;
  let fixture: ComponentFixture<MeetingsFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingsFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(MeetingsFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

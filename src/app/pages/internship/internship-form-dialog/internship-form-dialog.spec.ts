import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipFormDialog } from './internship-form-dialog';

describe('InternshipFormDialog', () => {
  let component: InternshipFormDialog;
  let fixture: ComponentFixture<InternshipFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternshipFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(InternshipFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

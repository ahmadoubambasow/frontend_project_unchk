import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateInsertionFormDialog } from './graduate-insertion-form-dialog';

describe('GraduateInsertionFormDialog', () => {
  let component: GraduateInsertionFormDialog;
  let fixture: ComponentFixture<GraduateInsertionFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraduateInsertionFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(GraduateInsertionFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

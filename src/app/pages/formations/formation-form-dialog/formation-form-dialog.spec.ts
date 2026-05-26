import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationFormDialog } from './formation-form-dialog';

describe('FormationFormDialog', () => {
  let component: FormationFormDialog;
  let fixture: ComponentFixture<FormationFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(FormationFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

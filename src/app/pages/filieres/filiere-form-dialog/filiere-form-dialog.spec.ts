import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereFormDialog } from './filiere-form-dialog';

describe('FiliereFormDialog', () => {
  let component: FiliereFormDialog;
  let fixture: ComponentFixture<FiliereFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiliereFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(FiliereFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

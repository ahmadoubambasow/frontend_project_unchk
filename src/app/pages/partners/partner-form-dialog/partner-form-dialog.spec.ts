import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerFormDialog } from './partner-form-dialog';

describe('PartnerFormDialog', () => {
  let component: PartnerFormDialog;
  let fixture: ComponentFixture<PartnerFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionFormDialog } from './promotion-form-dialog';

describe('PromotionFormDialog', () => {
  let component: PromotionFormDialog;
  let fixture: ComponentFixture<PromotionFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

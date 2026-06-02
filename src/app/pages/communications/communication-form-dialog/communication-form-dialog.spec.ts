import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationFormDialog } from './communication-form-dialog';

describe('CommunicationFormDialog', () => {
  let component: CommunicationFormDialog;
  let fixture: ComponentFixture<CommunicationFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunicationFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipDetails } from './internship-details';

describe('InternshipDetails', () => {
  let component: InternshipDetails;
  let fixture: ComponentFixture<InternshipDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternshipDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(InternshipDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

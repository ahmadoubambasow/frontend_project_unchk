import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateInsertionDetails } from './graduate-insertion-details';

describe('GraduateInsertionDetails', () => {
  let component: GraduateInsertionDetails;
  let fixture: ComponentFixture<GraduateInsertionDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraduateInsertionDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(GraduateInsertionDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

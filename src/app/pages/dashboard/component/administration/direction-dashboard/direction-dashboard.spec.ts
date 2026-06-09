import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionDashboard } from './direction-dashboard';

describe('DirectionDashboard', () => {
  let component: DirectionDashboard;
  let fixture: ComponentFixture<DirectionDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectionDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(DirectionDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

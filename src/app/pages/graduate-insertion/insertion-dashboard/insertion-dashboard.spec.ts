import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionDashboard } from './insertion-dashboard';

describe('InsertionDashboard', () => {
  let component: InsertionDashboard;
  let fixture: ComponentFixture<InsertionDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertionDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(InsertionDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

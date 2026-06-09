import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedagogicalDashboard } from './pedagogical-dashboard';

describe('PedagogicalDashboard', () => {
  let component: PedagogicalDashboard;
  let fixture: ComponentFixture<PedagogicalDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedagogicalDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(PedagogicalDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

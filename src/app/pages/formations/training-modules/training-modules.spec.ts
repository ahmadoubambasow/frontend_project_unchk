import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingModules } from './training-modules';

describe('TrainingModules', () => {
  let component: TrainingModules;
  let fixture: ComponentFixture<TrainingModules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingModules],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingModules);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

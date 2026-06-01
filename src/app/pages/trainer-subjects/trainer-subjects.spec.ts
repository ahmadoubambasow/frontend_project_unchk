import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerSubjects } from './trainer-subjects';

describe('TrainerSubjects', () => {
  let component: TrainerSubjects;
  let fixture: ComponentFixture<TrainerSubjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerSubjects],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerSubjects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateInsertions } from './graduate-insertions';

describe('GraduateInsertions', () => {
  let component: GraduateInsertions;
  let fixture: ComponentFixture<GraduateInsertions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraduateInsertions],
    }).compileComponents();

    fixture = TestBed.createComponent(GraduateInsertions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

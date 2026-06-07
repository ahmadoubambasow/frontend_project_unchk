import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelFiles } from './personnel-files';

describe('PersonnelFiles', () => {
  let component: PersonnelFiles;
  let fixture: ComponentFixture<PersonnelFiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelFiles],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonnelFiles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

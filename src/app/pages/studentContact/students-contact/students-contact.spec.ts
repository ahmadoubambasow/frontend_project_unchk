import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsContact } from './students-contact';

describe('StudentsContact', () => {
  let component: StudentsContact;
  let fixture: ComponentFixture<StudentsContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsContact],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelFileDetails } from './personnel-file-details';

describe('PersonnelFileDetails', () => {
  let component: PersonnelFileDetails;
  let fixture: ComponentFixture<PersonnelFileDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelFileDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonnelFileDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

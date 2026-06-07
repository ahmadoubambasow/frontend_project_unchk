import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelFileFormDialog } from './personnel-file-form-dialog';

describe('PersonnelFileFormDialog', () => {
  let component: PersonnelFileFormDialog;
  let fixture: ComponentFixture<PersonnelFileFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelFileFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonnelFileFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

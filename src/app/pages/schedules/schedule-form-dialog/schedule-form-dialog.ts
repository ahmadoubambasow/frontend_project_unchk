import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import {
  MatInputModule
} from '@angular/material/input';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatSelectModule
} from '@angular/material/select';

import {
  MatSnackBar
} from '@angular/material/snack-bar';

import { Schedule } from '../../../models/schedule.model';

import { ScheduleService } from '../../../services/schedule';

import { StudentGroup } from '../../../models/student-group.model';
import { StudentGroupService } from '../../../services/student-group';

import { TrainingModule } from '../../../models/training-module.model';
import { TrainingModuleService } from '../../../services/training-module';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-schedule-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],

  templateUrl:
    './schedule-form-dialog.html',

  styleUrl:
    './schedule-form-dialog.scss'
})
export class ScheduleFormDialog implements OnInit {

  /**
   * Formulaire
   */
  form!: FormGroup;

  /**
   * Chargement
   */
  loading = false;

  /**
   * Groupes
   */
  groups: StudentGroup[] = [];

  /**
   * Formateurs
   */
  trainers: User[] = [];

  /**
   * Modules
   */
  filteredModules: TrainingModule[] = [];

  /**
   * Jours
   */
  readonly days = [

    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY'
  ];

  constructor(

    private fb: 
      FormBuilder,

    private scheduleService:
      ScheduleService,

    private groupService:
      StudentGroupService,

    private moduleService:
      TrainingModuleService,

    private userService: 
      UserService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<ScheduleFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data?: Schedule

  ) {}

  ngOnInit(): void {

    // Build form
    this.buildForm();

    // Load groups
    this.loadGroups();

    // Load trainers
    this.loadTrainers();

    // Load group listener
    this.loadGroupListener();
  }

  /**
   * Construction formulaire
   */
  buildForm(): void {

    this.form = this.fb.group({

      groupId: [
        '',
        Validators.required
      ],

      trainingModuleId: [
        '',
        Validators.required
      ],

      trainerId: [
        '',
        Validators.required
      ],

      dayOfWeek: [
        '',
        Validators.required
      ],

      startTime: [
        '',
        Validators.required
      ],

      endTime: [
        '',
        Validators.required
      ],

      room: [
        '',
        Validators.required
      ],

      color: [
        '#2563eb',
        Validators.required
      ]
    });
  }

  /**
   * Chargement groupes
   */
  loadGroups(): void {

    this.groupService

      .getGroups()

      .subscribe({

        next: response => {

          this.groups = response;

          if (this.data) {

            this.patchForm();
          }
        },

        error: console.error
      });
  }

  /**
   * Chargement formateurs
   */
  loadTrainers(): void {

    this.userService

      .getTrainers()

      .subscribe({

        next: response => {

          this.trainers = response;
        },

        error: console.error
      });
  }

  /**
   * Chargement modules
   */
  loadGroupListener(): void {

    this.form

      .get('groupId')

      ?.valueChanges

      .subscribe(groupId => {

        if (!groupId) {

          this.filteredModules = [];

          return;
        }

        const selectedGroup =

          this.groups.find(

            group =>

              group.id === groupId
          );

        if (!selectedGroup) {

          return;
        }

        this.moduleService

          .getByFormation(
            selectedGroup.formationId
          )

          .subscribe({

            next: response => {

              console.log(response);
              this.filteredModules =
                response;
            },

            error: console.error
          });
      });
  }

  /**
   * Patch formulaire
   * @returns 
   */
  patchForm(): void {

    if (!this.data) {

      return;
    }

    this.form.patchValue({

      groupId:
        this.data.groupId,

      trainingModuleId:
        this.data.moduleId,

      trainerId:
        this.data.trainerId,

      dayOfWeek:
        this.data.dayOfWeek,

      startTime:
        this.data.startTime,

      endTime:
        this.data.endTime,

      room:
        this.data.room,

      color:
        this.data.color
    });

    const group =

      this.groups.find(

        g =>

          g.id ===
          this.data?.groupId
      );

    if (!group) {

      return;
    }

    this.moduleService

      .getByFormation(
        group.formationId
      )

      .subscribe({

        next: response => {

          this.filteredModules =
            response;
        },

        error: console.error
      });
  }

  /**
   * Soumission formulaire
   */
  submit(): void {

    // Vérification formulaire
    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    const request = this.form.value;

    // Mise à jour si id existe
    if (this.data?.id) {

      this.scheduleService

        .update(
          this.data.id,
          request
        )

        .subscribe({

          next: () => {

            this.loading = false;

            this.snackBar.open(

              'Créneau modifié',

              'Fermer',

              {
                duration: 3000
              }
            );

            this.dialogRef.close(true);
          },

          error: error => {

            console.error(error);

            this.loading = false;
          }
        });

      return;
    }

    // Création si id n'existe pas
    this.scheduleService

      .create(request)

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(

            'Créneau créé',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.dialogRef.close(true);
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }
}
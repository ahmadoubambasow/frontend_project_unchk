import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import {
  MatInputModule
} from '@angular/material/input';

import {
  MatSelectModule
} from '@angular/material/select';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatSnackBar
} from '@angular/material/snack-bar';

import { User } from '../../../models/user.model';

import { UserRequest } from '../../../models/user-request.model';

import { UserService } from '../../../services/user-service';
import { Role } from '../../../models/role.model';
import { RoleService } from '../../../services/role-service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-user-form-dialog',

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './user-form-dialog.html',

  styleUrl: './user-form-dialog.scss'
})
export class UserFormDialog implements OnInit {

  /**
   * Indicateur de chargement
   */
  loading = false;

  /**
   * Formulaire
   */
  userForm!: FormGroup;

  /**
   * Liste des roles
   */
  roles: Role[] = [];

  constructor(

    private fb: 
      FormBuilder,

    private userService:
      UserService,

    private roleService: 
      RoleService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<UserFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data: User | null

  ) {

    // Formulaire
    this.userForm =

      this.fb.group({

        fullName: [
          '',
          Validators.required
        ],

        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        password: [''],

        roleId: [
          '',
          Validators.required
        ]
      });
  }

  ngOnInit(): void {

    // Chargement des roles
    this.loadRoles();

    // Patch
    if (this.data) {

      this.userForm.patchValue({

        fullName:
          this.data.fullName,

        email:
          this.data.email,

        roleId:
          this.data.roleId
      });
    }
  }

  /**
   * Chargement des roles
   */
  loadRoles(): void {

    this.roleService

      .getRoles()

      .subscribe({

        next: (response) => {

          this.roles = response;
        },

        error: (error) => {

          console.error(error);
        }
      });
  }

  /**
   * Envoi du formulaire
   * @returns 
   */
  submit(): void {

    if (

      this.userForm.invalid

    ) {

      return;
    }

    this.loading = true;

    const payload: UserRequest =

      this.userForm.value;

    /**
     * UPDATE
     */
    if (this.data) {

      this.userService

        .updateUser(
          this.data.id,
          payload
        )

        .subscribe({

          next: () => {

            this.loading = false;

            this.snackBar.open(

              'Utilisateur modifié',

              'Fermer',

              {
                duration: 3000
              }
            );

            this.dialogRef.close(
              true
            );
          },

          error: (error) => {

            this.loading = false;

            console.error(error);
          }
        });

      return;
    }

    /**
     * CREATE
     */
    this.userService

      .createUser(
        payload
      )

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(

            'Utilisateur créé',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.dialogRef.close(
            true
          );
        },

        error: (error) => {

          this.loading = false;

          console.error(error);
        }
      });
  }
}
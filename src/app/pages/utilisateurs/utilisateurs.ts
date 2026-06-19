import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatDialog
} from '@angular/material/dialog';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user-service';
import { UserFormDialog } from './user-form-dialog/user-form-dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-users',

  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormField,
    MatInputModule,
    MatLabel
],

  templateUrl: './utilisateurs.html',

  styleUrl: './utilisateurs.scss'
})
export class Users implements OnInit {

  /**
   * Liste des utilisateurs
   */
  users: User[] = [];

  /**
   * Indicateur de chargement
   */
  loading = false;

  constructor(

    private userService:
      UserService,

    private dialog:
      MatDialog,

    private snackBar:
      MatSnackBar,

    private cdr: 
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    // Chargement des utilisateurs
    this.loadUsers();
  }

  /**
   * Chargement des utilisateurs
   */
  loadUsers(): void {

    this.loading = true;

    this.userService

      .getUsers()

      .subscribe({

        next: (response) => {

          this.users = response;

          this.loading = false;

          this.cdr.detectChanges();
        }
      });
  }

  /**
   * Création d'un utilisateur
   */
  createUser(): void {

    const dialogRef =

      this.dialog.open(

        UserFormDialog,

        {
          width: '650px',
          maxWidth: '95vw',

          maxHeight: '90vh',

          autoFocus: false
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadUsers();
        }
      });
  }

  /**
   * Modification d'un utilisateur
   * @param user 
   */
  editUser(
    user: User
  ): void {

    const dialogRef =

      this.dialog.open(

        UserFormDialog,

        {
          width: '600px',

          data: user
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadUsers();
        }
      });
  }

  /**
   * Suppression d'un utilisateur
   * @param user 
   * @returns 
   */
  deleteUser(
    user: User
  ): void {

    if (

      !confirm(
        `Supprimer ${user.fullName} ?`
      )

    ) {

      return;
    }

    this.userService

      .deleteUser(
        user.id
      )

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Utilisateur supprimé',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.loadUsers();
        }
      });
  }
}
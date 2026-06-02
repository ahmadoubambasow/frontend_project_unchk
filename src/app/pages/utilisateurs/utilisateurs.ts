import {
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




@Component({
  selector: 'app-users',

  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './utilisateurs.html',

  styleUrl: './utilisateurs.scss'
})
export class Users
implements OnInit {

  users: User[] = [];

  constructor(

    private userService:
      UserService,

    private dialog:
      MatDialog,

    private snackBar:
      MatSnackBar

  ) {}

  ngOnInit(): void {

    this.loadUsers();
  }

  loadUsers(): void {

    this.userService

      .getUsers()

      .subscribe({

        next: (response) => {

          this.users = response;
        }
      });
  }

  createUser(): void {

    const dialogRef =

      this.dialog.open(

        UserFormDialog,

        {
          width: '600px'
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadUsers();
        }
      });
  }

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
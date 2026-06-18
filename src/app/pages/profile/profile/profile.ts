import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../services/user-service';
import { AuthService } from '../../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {

  /**
   * Form
   */
  form!: FormGroup;

  /**
   * 
   */
  loading = false;

  constructor(

    private formBuilder: 
      FormBuilder,

    private userService: 
      UserService,

    private authService: 
      AuthService,

    private snackBar: 
      MatSnackBar,

    private cdr: 
      ChangeDetectorRef
  ) {}

  ngOnInit(): void {
      
    this.form = this.formBuilder.group({
      
      fullName: [''],

      email: [''],

      password: [''],
    });

    this.loadProfile();
  }

  /**
   * Chargement du profil
   */
  loadProfile(): void {

    this.loading = true;

    this.userService.getProfile().subscribe({

      next: (user) => {

        console.log(user);
        this.form.patchValue({

          fullName: user.fullName,

          email: user.email,

        });

        this.loading = false;
      },

      error: () => {

        console.error('Error loading profile');
        this.loading = false;
      }
    });
  }

  /**
   * Mise à jour du profil
   */
  save(): void {

    this.userService.updateProfile(this.form.value).subscribe({

      next: (user) => {

        this.authService.updateCurrentUser(user);

        this.loadProfile();

        this.snackBar.open(
          'Profil mis à jour avec succès',
          'Fermer',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        );
      },

      error: () => {

        this.snackBar.open(
          'Erreur lors de la mise à jour du profil',
          'Fermer',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        );
      }
    });
  }
}

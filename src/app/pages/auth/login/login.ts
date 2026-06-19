import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true
})
export class LoginComponent {

  /**
   * Formulaire login
   */
  loginForm: FormGroup;

  /**
   * Message erreur
   */
  errorMessage = '';

  constructor(

    private fb: 
      FormBuilder,

    private authService: 
      AuthService,
    
    private router: 
      Router
  ) {

    /**
     * Initialisation formulaire
     */
    this.loginForm = this.fb.group({
      
      email: ['', [Validators.required, Validators.email]],

      password: ['', Validators.required]
    });
  }

  /**
   * Soumission formulaire login
   */
  onSubmit(): void {

    if (this.loginForm.invalid) {

      return;
    }

    this.authService.login(this.loginForm.value)
      .subscribe({

        next: (response) => {

          this.authService.saveToken(response.token);

          this.authService.saveUser(response);

          this.router.navigateByUrl('/dashboard')
                  
          },

          error: (error) => {

            this.errorMessage =
              'Email ou mot de passe incorrect';
          }
      });
  }
}

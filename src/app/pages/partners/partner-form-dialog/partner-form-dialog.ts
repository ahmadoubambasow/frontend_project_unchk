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
  MatSnackBar
} from '@angular/material/snack-bar';
import { PartnerService } from '../services/partner';
import { Partner } from '../models/partner.model';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-partner-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl:
    './partner-form-dialog.html',

  styleUrl:
    './partner-form-dialog.scss'
})
export class PartnerFormDialog
implements OnInit {

  form!: FormGroup;

  loading = false;

  constructor(

    private fb:
      FormBuilder,

    private service:
      PartnerService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<PartnerFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data?: Partner

  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      contactPerson: [''],

      phone: [''],

      email: [''],

      address: [''],

      sector: [''],

      description: ['']
    });

    if (this.data) {

      this.form.patchValue(
        this.data
      );
    }
  }

  submit(): void {

    const request =

      this.data

        ? this.service.update(
            this.data.id,
            this.form.value
          )

        : this.service.create(
            this.form.value
          );

    request.subscribe(() => {

      this.dialogRef.close(true);
    });
  }
}
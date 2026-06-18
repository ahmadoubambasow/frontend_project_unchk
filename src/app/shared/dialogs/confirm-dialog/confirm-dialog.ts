import {
  Component,
  Inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import {
  MatButtonModule
} from '@angular/material/button';

/**
 * Interface de données de dialogue de confirmation
 */
export interface ConfirmDialogData {

  title: string;

  message: string;

  confirmText?: string;

  cancelText?: string;
}

@Component({
  selector: 'app-confirm-dialog',

  standalone: true,

  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],

  templateUrl: './confirm-dialog.html',

  styleUrl: './confirm-dialog.scss'
})
export class ConfirmDialog {

  constructor(

    public dialogRef:
      MatDialogRef<ConfirmDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data:
      ConfirmDialogData
  ) {}

  /**
   * Fermeture de la boite de dialogue
   */
  cancel(): void {

    this.dialogRef.close(false);
  }

  /**
   * Confirme la fermeture de la boite de dialogue
   */
  confirm(): void {

    this.dialogRef.close(true);
  }
}
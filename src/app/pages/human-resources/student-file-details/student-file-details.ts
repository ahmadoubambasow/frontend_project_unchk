import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute
} from '@angular/router';

import {
  MatCardModule
} from '@angular/material/card';
import { StudentFile } from '../models/student-file.model';
import { StudentFileService } from '../services/student-file';
@Component({
  selector: 'app-student-file-details',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule
  ],

  templateUrl:
    './student-file-details.html',

  styleUrl:
    './student-file-details.scss'
})
export class StudentFileDetails
implements OnInit {

  studentFile?: StudentFile;

  loading = false;

  constructor(

    private route:
      ActivatedRoute,

    private service:
      StudentFileService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    const id = Number(

      this.route.snapshot
        .paramMap
        .get('id')
    );

    this.loadStudentFile(id);
  }

  loadStudentFile(
    id: number
  ): void {

    this.loading = true;

    this.service

      .getById(id)

      .subscribe({

        next: response => {

          this.studentFile =
            response;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  isImage(
    path?: string
  ): boolean {

    if (!path) {

      return false;
    }

    const extension =

      path
        .split('.')
        .pop()
        ?.toLowerCase();

    return [

      'jpg',
      'jpeg',
      'png',
      'webp'

    ].includes(
      extension || ''
    );
  }
}
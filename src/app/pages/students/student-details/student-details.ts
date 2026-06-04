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

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';

import { Student } from '../../../models/student.model';

import { StudentService } from '../../../services/student';

@Component({
  selector: 'app-student-details',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl:
    './student-details.html',

  styleUrl:
    './student-details.scss'
})
export class StudentDetails
implements OnInit {

  student?: Student;

  loading = false;

  constructor(

    private route:
      ActivatedRoute,

    private studentService:
      StudentService,

      private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    const id = Number(

      this.route.snapshot
        .paramMap
        .get('id')
    );

    this.loadStudent(id);
  }

  loadStudent(
    id: number
  ): void {

    this.loading = true;

    this.studentService

      .getById(id)

      .subscribe({

        next: response => {

          this.student =
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
}
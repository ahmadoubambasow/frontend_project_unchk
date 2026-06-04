import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  forkJoin
} from 'rxjs';

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
import { StudentGroup } from '../../../models/student-group.model';

import { StudentService } from '../../../services/student';
import { StudentGroupService } from '../../../services/student-group';

@Component({
  selector: 'app-student-group-details',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl:
    './student-group-details.html',

  styleUrl:
    './student-group-details.scss'
})
export class StudentGroupDetails
implements OnInit {

  group?: StudentGroup;

  students: Student[] = [];

  loading = false;

  constructor(

    private route:
      ActivatedRoute,

    private studentService:
      StudentService,

    private studentGroupService:
      StudentGroupService,

    private router:
      Router,

    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    const id = Number(

      this.route.snapshot
        .paramMap
        .get('id')
    );

    this.loadGroup(id);
  }

  loadGroup(
    id: number
  ): void {

    this.loading = true;

    forkJoin({

      group:

        this.studentGroupService

          .getGroupById(id),

      students:

        this.studentService

          .getStudentsByGroup(id)

    })

    .subscribe({

      next: response => {

        this.group =
          response.group;

        this.students =
          response.students;

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: error => {

        console.error(error);

        this.loading = false;
      }
    });
  }

  openStudentDetails(
    student: Student
  ): void {

    this.router.navigate([
      '/students',
      student.id
    ]);
  }
}
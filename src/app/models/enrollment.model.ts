/**
 * Modèle inscription académique
 */

export interface Enrollment {

    id: number;

    studentName: string;

  matricule: string;

  formationName: string;

  formationCode: string;

  enrollmentDate: string;

  academicYear: string;

  status: string;

  createdAt: string;
}
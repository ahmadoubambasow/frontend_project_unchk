/**
 * Modèle inscription académique
 */

export interface Enrollment {

  id: number;

  studentId: number;
  
  studentName: string;

  matricule: string;

  formationId: number;

  formationName: string;

  formationCode: string;

  promotionId: number;

  promotionName: string;

  groupId: number;

  groupName: string;

  enrollmentDate: string;

  status: string;

  createdAt: string;

}
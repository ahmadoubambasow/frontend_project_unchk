/**
 * Modèle inscription académique
 */

export interface Enrollment {

  id: number;

  /**
   * Etudiant
   */
  studentId: number;
  
  studentName: string;

  matricule: string;

  /**
   * Filière
   */
  filiereId: number;

  filiereName: string;

  filiereCode: string;

  /**
   * Formation
   */

  formationId: number;

  formationName: string;

  formationCode: string;

  /**
   * Promotion
   */

  promotionId: number;

  promotionName: string;

  /**
   * Groupe
   */

  groupId: number;

  groupName: string;

  /**
   * Inscription
   */

  enrollmentDate: string;

  status: string;

  createdAt: string;

}
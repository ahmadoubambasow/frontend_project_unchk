/**
 * Modèle de groupe d'etudiant
 */
export interface StudentGroup {

  id: number;

  name: string;

  promotion: string;

  academicYear: number;

  formationName: string;

  studentCount: number;

  formationId: number
}
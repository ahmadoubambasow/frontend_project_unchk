/**
 * Modèle de demande de matière
 */
export interface SubjectRequest {

  name: string;

  description: string;

  coefficient: number;

  hours: number;

  formationId: number;
}
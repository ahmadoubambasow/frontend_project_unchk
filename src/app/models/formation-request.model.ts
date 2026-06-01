/**
 * DTO création formation.
 */
export interface FormationRequest {

  name: string;

  description: string;

  duration: number;

  filiereId: number;
}
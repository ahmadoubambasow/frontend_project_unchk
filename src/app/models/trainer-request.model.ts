/**
 * Modèle de demande de formateur
 */
export interface TrainerRequest {

  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  speciality: string;

  grade: string;

  type: string;
}
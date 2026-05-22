/**
 * Réponse backend login
 */

export interface LoginResponse {

  token: string;

  fullName: string;

  email: string;

  role: string;
}
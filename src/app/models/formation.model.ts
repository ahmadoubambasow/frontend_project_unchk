/**
 * Modèle de formation et de trainer
 */
export interface Trainer {

  id: number;

  fullName: string;

  email: string;

  role: string;
}

export interface Formation {

  id: number;

  name: string;

  startDate: string;

  endDate: string;

  formationType: string;

  level: string;

  fundingAmount: number;

  fundingType: string;

  maleCount: number;

  femaleCount: number;

  description: string;

  trainers: Trainer[];
}
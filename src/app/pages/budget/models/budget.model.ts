export interface Budget {

  id: number;

  year: number;

  title: string;

  type: string;

  plannedAmount: number;

  executedAmount: number;

  variance: number;

  description: string;

  documentPath: string;
}
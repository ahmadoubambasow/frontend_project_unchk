/**
 * Modèle document administratif
 */

export interface AdministrativeDocument {

  id: number;

  referenceNumber: string;

  title: string;

  type: string;

  status: string;

  documentDate: string;

  issuerId: number;

  issuerName: string;

  recipientId: number;

  recipientName: string;

  description: string;

  filePath: string;
}
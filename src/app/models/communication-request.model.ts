/**
 * Modèle de demande de communication
 */
export interface CommunicationRequest {

  title: string;

  type: string;

  description: string;

  report: string;

  eventDate: string;

  documentName: string;

  documentUrl: string;

  documentType: string;

  accessRole: string;
}
/**
 * Modèle de notification
 */
export interface Notification {

  id: number;

  title: string;

  message: string;

  isRead: boolean;

  createdAt: string;

  targetUrl?: string;

  communicationId?: number;

  communicationTitle?: string;

  communicationType?: string;

  communicationDescription?: string;

  communicationReport?: string;

  eventDate?: string;

  documentName?: string;

  documentUrl?: string;
}
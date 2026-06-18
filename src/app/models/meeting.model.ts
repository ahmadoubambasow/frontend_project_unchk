/**
 * Modèle de réunion
 */

export interface Meeting {

  id: number;

  title: string;

  type:
    | 'TUTORAT'
    | 'PREPARATION_COURS'
    | 'PREPARATION_EVALUATION';

  status:
    | 'PLANIFIEE'
    | 'EN_COURS'
    | 'TERMINEE'
    | 'ANNULEE';

  meetingDate: string;

  startTime: string;

  endTime: string;

  description: string;

  report: string;

  organizerId: number;

  organizerName: string;

  groupId?: number;

  groupName?: string;

  participantIds?: number[];

  participantNames?: string[];
}
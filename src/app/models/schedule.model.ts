/**
 * Emploi du temps
 */
export interface Schedule {

     id: number;

  title: string;

  sessionType: string;

  date: string;

  startTime: string;

  endTime: string;

  room: string;

  formationId: number;

  formationName: string;

  trainerId: number;

  trainerName: string;
}
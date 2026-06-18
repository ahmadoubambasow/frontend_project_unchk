/**
 * Modèle de demande d'emploi du temps
 */
export interface ScheduleRequest {

  groupId: number;

  trainingModuleId: number;

  trainerId: number;

  dayOfWeek: string;

  startTime: string;

  endTime: string;

  room: string;

  color: string;
}
/**
 * Modèle d'emploi du temps
 */
export interface Schedule {

  id: number;

  groupId: number;

  groupName: string;

  moduleId: number;

  moduleName: string;

  trainerId: number;

  trainerName: string;

  dayOfWeek: string;

  startTime: string;

  endTime: string;

  room: string;

  color: string;
}
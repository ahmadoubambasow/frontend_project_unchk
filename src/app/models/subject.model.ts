/**
 * Modèle matière
 */
export interface Subject {

    id: number;

    code: string;

    name: string;

    description: string;

    coefficient: number;

    hours: number;

    formationId: number;

    formationName: string;

    filiereId: number;

    filiereName: string;
}
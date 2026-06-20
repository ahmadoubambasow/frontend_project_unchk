import { DashboardItem } from './dashboard-item.model';

/**
 * Statistiques dashboard
 */
export interface DashboardStats {

  // Type dashboard
  dashboardType: string;

  // KPIs
  totalStudents: number;

  totalUsers: number;

  totalFormations: number;

  totalPromotions: number;

  totalGroups: number;

  totalPartners: number;

  totalInternships: number;

  totalInsertions: number;

  totalDocuments: number;

  // Student
  studentIne: string;

  studentFormation: string;

  studentGroup: string;

  studentPromotion: string;

  internshipCompany: string;

  internshipStatus: string;

  insertionStatus: string;

  insertionCompany: string;

  insertionPosition: string;

  // Taux
  insertionRate: number;

  internshipSuccessRate: number;

  // Répartitions
  internshipsByStatus: Record<string, number>;

  insertionsByStatus: Record<string, number>;

  documentsByStatus: Record<string, number>;

  usersByRole: Record<string, number>;

  // Graphiques
  studentsByFormation: DashboardItem[];

  studentsByPromotion: DashboardItem[];

  studentsByGroup: DashboardItem[];

  documentsByType: DashboardItem[];

  partnersBySector: DashboardItem[];

  // Profil étudiant

  studentFullName: string;

  studentEmail: string;

  studentBirthDate: string;

  studentStartYear: number;

  studentGraduationYear: number;

  // Infos tuteur
  totalModules: number;

  totalSchedules: number;

  teacherModules: DashboardItem[];

}
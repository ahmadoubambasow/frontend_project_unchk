import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login';
import { Dashboard } from './pages/dashboard/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { MainLayout } from './layout/main-layout/main-layout';
import { Students } from './pages/students/students';
import { Formations } from './pages/formations/formations';
import { Trainers } from './pages/trainers/trainers';
import { Schedules } from './pages/schedules/schedules';
import { Promotions } from './pages/promotions/promotions';
import { Filieres } from './pages/filieres/filieres';
import { Communications } from './pages/communications/communications';
import { Users } from './pages/utilisateurs/utilisateurs';
import { FormationDetails } from './pages/formations/formation-details/formation-details';
import { StudentDetails } from './pages/students/student-details/student-details';
import { StudentGroupDetails } from './pages/student-groups/student-group-details/student-group-details';
import { StudentGroups } from './pages/student-groups/student-groups';
import { Meetings } from './pages/meetings/meetings/meetings';
import { MeetingDetails } from './pages/meetings/meeting-details/meeting-details';
import { Partners } from './pages/partners/partners/partners';
import { PartnerDetails } from './pages/partners/partner-details/partner-details';
import { Internships } from './pages/internship/internship/internship';
import { InternshipDetails } from './pages/internship/internship-details/internship-details';
import { StudentContacts } from './pages/studentContact/students-contact/students-contact';
import { StudentContactDetails } from './pages/studentContact/student-contact-detail/student-contact-detail';
import { GraduateInsertions } from './pages/graduate-insertion/graduate-insertions/graduate-insertions';
import { GraduateInsertionDetails } from './pages/graduate-insertion/graduate-insertion-details/graduate-insertion-details';
import { InsertionDashboardPage } from './pages/graduate-insertion/insertion-dashboard/insertion-dashboard';
import { AdministrativeDocuments } from './pages/administration/administrative-documents/administrative-documents';
import { AdministrativeDocumentDetails } from './pages/administration/administrative-document-details/administrative-document-details';
import { Budgets } from './pages/budget/budgets/budgets';
import { BudgetDetails } from './pages/budget/budget-details/budget-details';
import { PersonnelFiles } from './pages/human-resources/personnel-files/personnel-files';
import { PersonnelFileDetails } from './pages/human-resources/personnel-file-details/personnel-file-details';
import { StudentFiles } from './pages/human-resources/student-files/student-files';
import { StudentFileDetails } from './pages/human-resources/student-file-details/student-file-details';
import { roleGuard } from './guards/role-guard';

import {

    ADMIN_ONLY,

    INSERTION_ROLES,

    STUDENT_MANAGEMENT_ROLES,

    ACADEMIC_ROLES,

    HR_ROLES,

    TEACHING_ROLES,

    MEETING_ROLES,

    COMMUNICATION_ROLES,

    ALL_AUTHENTICATED_ROLES,

    ADMIN_AND_DIRECTION,

    DASHBOARD_ROLES

} from './constants/route-roles';

export const routes: Routes = [
    
    /**
     * Route login
     */
    {
        path: 'login',
        component: LoginComponent 
    },

    /**
     * Layout sécurisé
     */
    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard],

        children: [
            {
                path: 'dashboard',
                component: Dashboard,
                canActivate: [roleGuard],
                data: {
                    roles: DASHBOARD_ROLES
                }
            },

            {
                path: 'dashboard-insertion',
                component: InsertionDashboardPage,
                canActivate: [roleGuard],
                data: {
                    roles: INSERTION_ROLES
                }
            },

            {
                path: 'notifications',
                loadComponent: () =>
                    import('./pages/dashboard/notifications/notifications')
                        .then(m => m.Notifications),
                canActivate: [roleGuard],
                data: {
                    roles: ALL_AUTHENTICATED_ROLES
                }
            },

            {
                path: 'administrative-documents',
                component: AdministrativeDocuments,
                canActivate: [roleGuard],
                data: {
                    roles: HR_ROLES
                }
            },

            {
                path: 'administrative-documents/:id',
                component: AdministrativeDocumentDetails,
                canActivate: [roleGuard],
                data: {
                    roles: HR_ROLES
                }
            },

            {
                path: 'budgets',
                component: Budgets,
                canActivate: [roleGuard],
                data: {
                    roles: ADMIN_AND_DIRECTION
                }
            },

            {
                path: 'budgets/:id',
                component: BudgetDetails,
                canActivate: [roleGuard],
                data: {
                    roles: ADMIN_AND_DIRECTION
                }
            },

            {
                path: 'personnel-files',
                component: PersonnelFiles,
                canActivate: [roleGuard],
                data: {
                    roles: HR_ROLES
                }
            },

            {
                path: 'personnel-files/:id',
                component: PersonnelFileDetails,
                canActivate: [roleGuard],
                data: {
                    roles: HR_ROLES
                }
            },

            {
                path: 'student-files',
                component: StudentFiles,
                canActivate: [roleGuard],
                data: {
                    roles: HR_ROLES
                }
            },

            {
                path: 'student-files/:id',
                component: StudentFileDetails,
                canActivate: [roleGuard],
                data: {
                    roles: HR_ROLES
                }
            },

            {
                path: 'users',
                component: Users,
                canActivate: [roleGuard],
                data: {
                    roles: ADMIN_ONLY
                }
            },

            {
                path: 'students',
                component: Students,
                canActivate: [roleGuard],
                data: {
                    roles: STUDENT_MANAGEMENT_ROLES
                }
            },

            {
                path: 'students/:id',
                component: StudentDetails,
                canActivate: [roleGuard],
                data: {
                    roles: STUDENT_MANAGEMENT_ROLES
                }
            },

            {
                path: 'student-groups',
                component: StudentGroups,
                canActivate: [roleGuard],
                data: {
                    roles: ACADEMIC_ROLES
                }
            },

            {
                path: 'student-groups/:id',
                component: StudentGroupDetails,
                canActivate: [roleGuard],
                data: {
                    roles: ACADEMIC_ROLES
                }
            },

            {
                path: 'formations',
                component: Formations,
                canActivate: [roleGuard],
                data: {
                    roles: ACADEMIC_ROLES
                }
            },

            {
                path: 'formations/:id',
                component: FormationDetails,
                canActivate: [roleGuard],
                data: {
                    roles: ACADEMIC_ROLES
                }
            },

            {
                path: 'trainers',
                component: Trainers,
                canActivate: [roleGuard],
                data: {
                    roles: ACADEMIC_ROLES
                }
            },

            {
                path: 'schedules',
                component: Schedules,
                canActivate: [roleGuard],
                data: {
                    roles: TEACHING_ROLES
                }
            },

            {
                path: 'schedules/calendar',
                loadComponent: () =>
                    import('./pages/schedules/schedule-calendar/schedule-calendar')
                        .then(m => m.ScheduleCalendar),
                canActivate: [roleGuard],
                data: {
                    roles: TEACHING_ROLES
                }
            },

            {
                path: 'meetings',
                component: Meetings,
                canActivate: [roleGuard],
                data: {
                    roles: MEETING_ROLES
                }
            },

            {
                path: 'meetings/:id',
                component: MeetingDetails,
                canActivate: [roleGuard],
                data: {
                    roles: MEETING_ROLES
                }
            },

            {
                path: 'partners',
                component: Partners,
                canActivate: [roleGuard],
                data: {
                    roles: INSERTION_ROLES
                }
            },

            {
                path: 'partners/:id',
                component: PartnerDetails,
                canActivate: [roleGuard],
                data: {
                    roles: INSERTION_ROLES
                }
            },

            {
                path: 'internships',
                component: Internships,
                canActivate: [roleGuard],
                data: {
                    roles: INSERTION_ROLES
                }
            },

            {
                path: 'internships/:id',
                component: InternshipDetails,
                canActivate: [roleGuard],
                data: {
                    roles: INSERTION_ROLES
                }
            },

            {
                path: 'students-contacts',
                component: StudentContacts,
                canActivate: [roleGuard],
                data: {
                    roles: INSERTION_ROLES
                }
            },

            {
                path: 'student-contacts/:id',
                component: StudentContactDetails,
                canActivate: [roleGuard],
                data: {
                    roles: INSERTION_ROLES
                }
            },

            {
                path: 'graduate-insertions',
                component: GraduateInsertions,
                canActivate: [roleGuard],
                data: {
                    roles: INSERTION_ROLES
                }
            },

            {
                path: 'graduate-insertions/:id',
                component: GraduateInsertionDetails,
                canActivate: [roleGuard],
                data: {
                    roles: INSERTION_ROLES
                }
            },

            {
                path: 'promotions',
                component: Promotions,
                canActivate: [roleGuard],
                data: {
                    roles: ACADEMIC_ROLES
                }
            },

            {
                path: 'filieres',
                component: Filieres,
                canActivate: [roleGuard],
                data: {
                    roles: ACADEMIC_ROLES
                }
            },

            {
                path: 'communications',
                component: Communications,
                canActivate: [roleGuard],
                data: {
                    roles: COMMUNICATION_ROLES
                }
            },

            {
                path: 'archives',
                loadComponent: () =>
                    import('./pages/communications/archives/archives')
                        .then(m => m.Archives),
                canActivate: [roleGuard],
                data: {
                    roles: ALL_AUTHENTICATED_ROLES
                }
            }
        ]
    },


    /**
     * Redirection par défaut
     */
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    
];

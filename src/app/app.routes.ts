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
                component: Dashboard
            },

            {
                path: 'dashboard-insertion',
                component: InsertionDashboardPage
            },

            {
                path: 'notifications',
                loadComponent: () =>
                    import(
                    './pages/dashboard/notifications/notifications'
                    ).then(
                    m => m.Notifications
                 )
            },

            {
                path: 'administrative-documents',
                component: AdministrativeDocuments
            },

            {
                path: 'administrative-documents/:id',
                component: AdministrativeDocumentDetails
            },

            {
                path: 'budgets',
                component: Budgets
            },

            {
                path: 'budgets/:id',
                component: BudgetDetails
            },

            {
                path: 'personnel-files',
                component: PersonnelFiles
            },

            {
                path: 'personnel-files/:id',
                component: PersonnelFileDetails
            },
                                        
            {
                path: 'student-files',
                component: StudentFiles
            },

            {
                path: 'student-files/:id',
                component: StudentFileDetails
            },
                                        
            {
                path: 'users',
                component: Users
            },

            {
                path: 'students',
                component: Students
            },

            {
                path: 'students/:id',   
                component: StudentDetails
            },

            {
                path: 'student-groups',
                component: StudentGroups
            },

            {
                path: 'student-groups/:id',
                component: StudentGroupDetails
            },

            {
                path: 'formations',
                component: Formations
            },

            {
                path: 'formations/:id',
                component: FormationDetails,
            },

            {
                path: 'trainers',
                component: Trainers
            },

            {
                path: 'schedules',
                component: Schedules
            },

            {
                path: 'schedules/calendar',
                loadComponent: () =>

                    import(
                            './pages/schedules/schedule-calendar/schedule-calendar'
                )
                .then(
                    m => m.ScheduleCalendar
                )
            },

            {
                'path': 'meetings',
                component: Meetings
            },

            {
                path: 'meetings/:id',
                component: MeetingDetails
            },

            {
                path: 'partners',
                component: Partners
            },

            {
                path: 'partners/:id',
                component: PartnerDetails
            },

            {
                path: 'internships',
                component: Internships
            },

            {
                path: 'internships/:id',
                component: InternshipDetails
            },

            {
                path: 'students-contacts',
                component: StudentContacts
            },

            {
                path: 'student-contacts/:id',
                component: StudentContactDetails
            },

            {
                path: 'graduate-insertions',
                component: GraduateInsertions
            },

            {
                path: 'graduate-insertions/:id',
                component: GraduateInsertionDetails
            },

            {
                path: 'promotions',
                component: Promotions
            },

            {
                path: 'filieres',
                component: Filieres
            },

            {
                path: 'communications',
                component: Communications
            },

            {
                path: 'archives',
                loadComponent: () => 

                    import(
                        './pages/communications/archives/archives'
                    )
                    .then(
                        m => m.Archives
                    )
                
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

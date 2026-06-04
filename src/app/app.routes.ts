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
                path: 'notifications',
                loadComponent: () =>
                    import(
                    './pages/dashboard/notifications/notifications'
                    ).then(
                    m => m.Notifications
                 )
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

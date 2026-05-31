import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login';
import { Dashboard } from './pages/dashboard/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { MainLayout } from './layout/main-layout/main-layout';
import { Students } from './pages/students/students';
import { Formations } from './pages/formations/formations';
import { Enrollments } from './pages/enrollments/enrollments';
import { Trainers } from './pages/trainers/trainers';
import { Schedules } from './pages/schedules/schedules';
import { Promotions } from './pages/promotions/promotions';

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
                path: 'students',
                component: Students
            },

            {
                path: 'formations',
                component: Formations
            },

            {
                path: 'enrollments',
                component: Enrollments
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

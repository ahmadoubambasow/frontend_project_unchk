import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login';
import { Dashboard } from './pages/dashboard/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { MainLayout } from './layout/main-layout/main-layout';
import { Students } from './pages/students/students';

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

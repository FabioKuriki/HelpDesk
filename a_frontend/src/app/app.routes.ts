import { Routes } from '@angular/router';
import { SignUp } from './pages/signUp/page-signUp';
import { Login } from './pages/login/page-login';
import { Profile } from './pages/after-login/all/profile/profile';
import { Access } from './pages/after-login/all/access/page-access';
import { Dashboard } from './pages/after-login/atendente/dashboard/page-dashboard';
import { Tickets } from './pages/after-login/atendente/tickets/page-tickets';
import { PageCheckTicket } from './pages/after-login/all/check-ticket/page-check-ticket';

export const routes: Routes = [
    {path: "", component: Login},
    {path: "sign-up", component: SignUp},
    {path: "access", component: Access,
        children: [
            {path: "dashboard", component: Dashboard},
            {path: "tickets", component: Tickets},
            {path: "profile", component: Profile},
            {path: "check-ticket/:id", component: PageCheckTicket},
        ]
    },
];
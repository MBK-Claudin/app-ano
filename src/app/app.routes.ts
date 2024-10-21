import { TachesComponent } from './composants/taches/taches/taches.component';
import { Routes } from '@angular/router';
import { ObjectifComponent } from './composants/objectifs/objectif/objectif.component';
import { EditObjectifComponent } from './composants/objectifs/edit-objectif/edit-objectif.component';
import { AddObjectifComponent } from './composants/objectifs/add-objectif/add-objectif.component';
import { DetailsObjectifComponent } from './composants/objectifs/details-objectif/details-objectif.component';
import { ProgrammeComponent } from './composants/programmes/programme/programme.component';
import { AddProgrammeComponent } from './composants/programmes/add-programme/add-programme.component';
import { DetailsProgrammeComponent } from './composants/programmes/details-programme/details-programme.component';
import { EditProgrammeComponent } from './composants/programmes/edit-programme/edit-programme.component';
import { AffectationsComponent } from './composants/affectations/affectations.component';
import { DetailsBudgetannuelComponent } from './composants/budgetannuels/details-budgetannuel/details-budgetannuel.component';
import { ActiviteBudgetannuelComponent } from './composants/budgetannuels/activite-budgetannuel/activite-budgetannuel.component';
import { PlaningGanttComponent } from './composants/programmes/planing-gantt/planing-gantt.component';
import { AnoComponent } from './composants/anos/ano/ano.component';
import { AddAnoComponent } from './composants/anos/add-ano/add-ano.component';
import { EditAnoComponent } from './composants/anos/edit-ano/edit-ano.component';
import { DetailsAnoComponent } from './composants/anos/details-ano/details-ano.component';
import { LoginComponent } from './composants/authentification/login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AuthOrganisationComponent } from './composants/authentification/auth-organisation/auth-organisation.component';
import { LoginCheckComponent } from './composants/authentification/login-check/login-check.component';
import { authGuard } from './services/auth.guard';
import { OrganisationComponent } from './composants/organisation/organisation.component';
import path from 'path';
import { SiteAllComponent } from './composants/site-all/site-all.component';
import { FactureComponent } from './composants/factures/facture/facture.component';
import { PaiementComponent } from './composants/paiements/paiement/paiement.component';
import { PtbaComponent } from './composants/budgetannuels/ptba/ptba.component';

export const routes: Routes = [

    {
        path: '', component: MenuComponent,canActivate: [authGuard], children: [
            { path: '', component: ObjectifComponent },
            { path: 'objectif', component: ObjectifComponent },
            { path: 'select/objectif/:id', component: EditObjectifComponent },
            { path: 'add/objectif', component: AddObjectifComponent },
            { path: 'details/objectif/:id', component: DetailsObjectifComponent },
            { path: 'programmes', component: ProgrammeComponent },
            { path: 'add/programme', component: AddProgrammeComponent },
            { path: 'details/programme/:id', component: DetailsProgrammeComponent },
            { path: 'edit/programme/:id', component: EditProgrammeComponent },
            { path: 'taches', component: TachesComponent },
            { path: 'affectations', component: AffectationsComponent },
            { path: 'details/budgetannuel/:id', component: DetailsBudgetannuelComponent },
            { path: 'activité/budgetannuel/:id', component: ActiviteBudgetannuelComponent },
            { path: 'programme/planing/:id', component: PlaningGanttComponent },
            { path: 'ano', component: AnoComponent },
            { path: 'add/ano', component: AddAnoComponent },
            { path: 'edit/ano/:id', component: EditAnoComponent },
            { path: 'select/ano/:id', component: DetailsAnoComponent },
            { path: 'organisations', component: OrganisationComponent },
            { path: 'sites', component: SiteAllComponent },
            { path: 'facture', component: FactureComponent },
            { path: 'paiement', component: PaiementComponent },
            { path: 'details/facture/:id', component: FactureComponent },
            { path: 'ptba', component: PtbaComponent },

        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'user/organisation/:isOrg', component: AuthOrganisationComponent },
    { path: 'login/check', component: LoginCheckComponent },
];
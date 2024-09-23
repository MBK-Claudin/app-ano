import { Routes } from '@angular/router';
import { ObjectifComponent } from './composants/objectifs/objectif/objectif.component';
import { EditObjectifComponent } from './composants/objectifs/edit-objectif/edit-objectif.component';
import { AddObjectifComponent } from './composants/objectifs/add-objectif/add-objectif.component';

export const routes: Routes = [
    { path: '' , redirectTo: '/objectif', pathMatch: 'full' },
    { path: 'objectif', component: ObjectifComponent },
    { path: 'select/objectif/:id', component: EditObjectifComponent }, 
    { path: 'add/objectif', component: AddObjectifComponent },
];

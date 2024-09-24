import { RouterModule, Routes } from '@angular/router';
import { ObjectifComponent } from './composants/objectifs/objectif/objectif.component';
import { EditObjectifComponent } from './composants/objectifs/edit-objectif/edit-objectif.component';
import { AddObjectifComponent } from './composants/objectifs/add-objectif/add-objectif.component';
import { DetailsObjectifComponent } from './composants/objectifs/details-objectif/details-objectif.component';
import { ProgrammeComponent } from './composants/programmes/programme/programme.component';
import { NgModel } from '@angular/forms';
import { AddProgrammeComponent } from './composants/programmes/add-programme/add-programme.component';
import { DetailsProgrammeComponent } from './composants/programmes/details-programme/details-programme.component';

export const routes: Routes = [
    { path: 'objectif', component: ObjectifComponent },
    { path: 'select/objectif/:id', component: EditObjectifComponent }, 
    { path: 'add/objectif', component: AddObjectifComponent },
    { path: 'details/objectif/:id', component: DetailsObjectifComponent },
    { path: 'programmes', component: ProgrammeComponent },
    { path: 'add/programme', component: AddProgrammeComponent },
    { path: 'details/programme/:id', component: DetailsProgrammeComponent },


];
import { FinancementComponent } from './../../../financement/financement.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersComponent } from '../../users/users/users.component';
import { BudgetannuelsComponent } from '../../budgetannuels/budgetannuels/budgetannuels.component';
import { AddAnoComponent } from '../../anos/add-ano/add-ano.component';
import { PlaningGanttComponent } from '../planing-gantt/planing-gantt.component';
import { AnoComponent } from '../../anos/ano/ano.component';
import { SiteComponent } from '../../sites/site/site.component';
import { LivrableComponent } from '../../livrables/livrable/livrable.component';
import { ContractComponent } from '../../contracts/contract/contract.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AnoProgrammeComponent } from '../../anos/ano-programme/ano-programme.component';
import { GanttPlaningComponent } from '../gantt-planing/gantt-planing.component';
import { FactureProgrammeComponent } from '../../factures/facture-programme/facture-programme.component';
import { PlanTransformationComponent } from '../plan-transformation/plan-transformation.component';
import { ImpactsComponent } from '../../../impacts/impacts.component';
import { MissionListComponent } from "../../../mission-list/mission-list.component";

@Component({
  selector: 'app-details-programme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UsersComponent,
    BudgetannuelsComponent,
    AddAnoComponent,
    AnoComponent,
    SiteComponent,
    LivrableComponent,
    ContractComponent,
    NgxSkeletonLoaderModule,
    AnoProgrammeComponent,
    ContractComponent,
    GanttPlaningComponent,
    FinancementComponent,
    FactureProgrammeComponent,
    PlanTransformationComponent,
    ImpactsComponent,
<<<<<<< Updated upstream
    MissionListComponent
],
=======
    MissionListComponent,
  ],
>>>>>>> Stashed changes
  templateUrl: './details-programme.component.html',
  styleUrl: './details-programme.component.css'
})

export class DetailsProgrammeComponent {
  programme: any;
  organisations: any[] = [];
  responsables: any[] = [];
  loader: boolean = true;
  id: any;

  constructor(
    private programmeService: ProgrammeServiceService,
    private location: Location,
    private router: ActivatedRoute,
  ){}

  ngOnInit(){
    this.loader = true;
    this.id = this.router.snapshot.paramMap.get('id');
    this.getProgramme();
  }

  goBack(){
    this.location.back();
  }

  getProgramme(){
    this.programmeService.selectProgramme(this.id).subscribe(data => {
      this.programme = data;
      this.organisations = data.organisations;
      this.responsables = data.users;
      this.loader = false;
    },error => {
      console.error(error);
    });
  }

}
